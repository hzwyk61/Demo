/*
    Parse a query string to an object.
*/
$.parseQueryParams = function ( str ) {
    var pairs = str.replace( '&amp;', '&' ).split( '&' );
    var params = {};
    $.each( pairs, function ( i, it ) {
        if ( ! it ) {
            return;
        }
        var parts = it.split( '=' );
        var name = parts[0];
        var value = ( parts[1] && decodeURIComponent( parts[1].replace( /\+/g, " " ) ) )|| '';
        if ( name.slice( -2 ) === '[]' ) {
            name = name.slice( 0, -2 );
            if ( ! ( name in params ) ) {
                params[ name ] = [];
            }
            params[ name ].push( value )
        }
        else {
            params[ name ] = value;
        }
    });
    return params;
};

App.flexUpdate = function ( e, noPostback ) {

    var params = $( 'form' ).serialize();

    if ( ! noPostback ) {

        // jQuery ajax events aren't working here for some reason.
        App.startSpinner();

        $.ajax( 'data.php', {
            data: params,
            success: function ( response ) {
                var json = JSON.parse( response );
                $( '#flex-style, .output-css' ).html( $.trim( json.kitchensink ) );
                $( '.vanilla-css' ).html( $.trim( json.vanilla ) );
                if ( history.pushState ) {
                    history.pushState( {}, null, App.baseUrl + '/?' + params );
                }
                App.stopSpinner();
            }
        });
    }

    // Set the flex-direction.
    var paramsObj = $.parseQueryParams( params );
    $( '.main' ).attr( 'data-flex-direction', paramsObj['flex-direction'] );

    // Set writing direction.
    $( '.main' ).attr( 'dir', paramsObj.rtl ? 'rtl' : 'ltr' );
};

App.addFlexItem = function () {
    $( $( '#flex-item-form-tpl' ).html() ).appendTo( '.flex-items' );
    var $new = $( $( '#flex-item-tpl' ).html() );
    var count = $( '.flex-container' ).find( '> .flex-item' ).length;
    $new.find( '.counter' ).html( count + 1 );
    $new.appendTo( '.flex-container' );
    return false;
};

App.removeFlexItem = function () {
    $( '.flex-items > :last-child' ).remove();
    $( '.flex-container > :last-child' ).remove();
    return false;
};

App.fixedHeightToggle = function () {

    var $toggler = $( 'input[name="fixed-height"]' );
    var toggleFixedHeight = function () {
        var $container = $( '.flex-container' );
        if ( ! this.checked ) {
            $container.removeClass( 'fixed-height' );
        }
        else {
            $container.addClass( 'fixed-height' );
        }
    };

    toggleFixedHeight.call( $toggler[0] );
    $toggler.change( toggleFixedHeight );
};

App.vanillaCssToggle = function () {

    var $vanilla = $( 'input.show-vanilla' );
    var toggleVanilla = function () {
        if ( this.checked ) {
            $( '.vanilla-css' ).show();
        }
        else {
            $( '.vanilla-css' ).hide();
        }
    };

    toggleVanilla.call( $vanilla[0] );
    $vanilla.change( toggleVanilla );
};

App.markdownTooltips = function () {

    $( '.main, .controls' ).delegate( '[data-markdown-tooltip][title]', 'hover',
            function (e) {
                if ( e.type === 'mouseenter' ) {
                    var $this = $( this );
                    if ( ! $this.data( 'title' ) ) {
                        $this.data( 'title', this.title );
                        this.setAttribute( 'title', '' );
                    }
                    $( '<section/>' ).
                        addClass( 'tooltip' ).
                        html( markdown.toHTML( $this.data( 'title' ) ) ).
                        appendTo( this );
                }
                else {
                    $( this ).find( '> .tooltip' ).remove();
                }
            }
        );
};

App.getFlexboxImplementation = function () {

    var property = 'display';
    var testElem = document.createElement( 'div' );
    var prefixes = [ '', 'Webkit', 'Moz', 'ms', 'O' ];

    // Test the display value and a property to avoid false positives.
    var flexies  = [
        [ 'flex',    'order' ],
        [ 'flexbox', 'flexOrder' ],
        [ 'box',     'boxOrdinalGroup' ]
    ];

    for ( var i = 0; i < flexies.length; i++ ) {

        var flexDisplayValue = flexies[i][0];
        var flexTestProp = flexies[i][1];

        for ( var j = 0; j < prefixes.length; j++ ) {

            var prefix = prefixes[j];

            // Mobile Chrome is giving false positives with display: flexbox;
            // It seems to essentially support the 2009 spec behaviour.
            if ( prefix === 'Webkit' && flexDisplayValue === 'flexbox' ) {
                continue;
            }
            var displayValue = prefix + flexDisplayValue;
            var prop = prefix + flexTestProp;

            if ( prefix ) {
                displayValue = '-' + prefix.toLowerCase() + '-' + flexDisplayValue;
                prop = prefix + flexTestProp.charAt(0).toUpperCase() + flexTestProp.slice(1);
            }
            testElem.style.display = displayValue;

            if (
                testElem.style.display === displayValue &&
                prop in testElem.style
            ) {
                // alert([flexDisplayValue, displayValue]);
                return {
                    'type': flexDisplayValue,
                    'value': displayValue
                }
            }
        }
    }
    return {
        'type': null,
        'value': null
    };
};


App.startSpinner = function () {
    var $spinner = $( '<img id="ajax-loader" />' )
    .attr( 'src', 'images/ajax-loader.gif' )
    .css({
        position: 'absolute',
        top: 330,
        left: '50%',
        marginLeft: -176,
        marginTop: -26,
        opacity: 0
    });

    // Add a short deley to avoid showing unless necessary.
    App.ajaxProgressSpinnerTimer = setTimeout( function () {
        $( document.body ).append( $spinner );
        $spinner.fadeTo( 200, .3 );
    }, 100 );
};

App.stopSpinner = function () {
    clearTimeout( App.ajaxProgressSpinnerTimer );
    $( '#ajax-loader' ).stop().remove();
};


jQuery( function ($) {

    $( 'form' ).on( 'change', 'input, select', App.flexUpdate );
    $( document ).on( 'click', 'a.add-box', App.addFlexItem );
    $( document ).on( 'click', 'a.remove-box', App.removeFlexItem );
    $( '.output-css, .vanilla-css' ).dblclick( function () {
        var self = this;
        self.select();
        setTimeout( function () {
            self.scrollTop = 0;
        }, 0);
    });

    var implementation = App.getFlexboxImplementation();
    if ( implementation.type ) {
        var flexInfo = $( '.speclist' ).find( "[data-flextype='" + implementation.type + "'] > h3" ).html();
        var $supportBox = $( '<div />' ).addClass( 'flex-support' );
        flexInfo =
            ( flexInfo ?
                 '<code class="sample">display: ' + implementation.value +
                 '</code><br/>This browser supports ' + flexInfo :
                'This browser does not support flexbox.'
            );
        $supportBox.html( flexInfo );
        $( '.speclist' ).after( $supportBox );
    }

    App.markdownTooltips();
    App.vanillaCssToggle();
    App.fixedHeightToggle();
    App.flexUpdate( null, true );
});
