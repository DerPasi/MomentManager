var tabMenu = {

    focused: "gallery",

    initialize: function() {
        var element = $('#tab-menu');

        var tabMenuVal = '<div id="tab_gallery" class="tab">';
        tabMenuVal += '<svg class="tab-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M1.859 6l-.489-2h21.256l-.491 2h-20.276zm1.581-4l-.439-2h17.994l-.439 2h-17.116zm20.56 16h-24l2 6h20l2-6zm-20.896-2l-.814-6h19.411l-.839 6h2.02l1.118-8h-24l1.085 8h2.019zm2.784-3.995c-.049-.555.419-1.005 1.043-1.005.625 0 1.155.449 1.185 1.004.03.555-.438 1.005-1.044 1.005-.605 0-1.136-.449-1.184-1.004zm7.575-.224l-1.824 2.68-1.813-1.312-2.826 2.851h10l-3.537-4.219z"/></svg>'
        tabMenuVal +=  '</div>'
        tabMenuVal +=  '<div id="tab_addNew" class="tab">'
        tabMenuVal +=  '<svg class="tab-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z"/></svg>'
        tabMenuVal +=  '</div>'

        element.html(tabMenuVal);

        $('#tab_gallery').addClass('focused');

        $("#tab-menu .tab").click(function() {
            console.log($(this)[0].id);
            tabMenu.clicked( $(this)[0].id );
        });
    },

    clicked: function(tabId) {
        var id = tabId.split("_")[1];
        
        if(tabMenu.focused != id) {
            $('.tab').removeClass('focused');
            $('#' + tabId).addClass('focused');

            tabMenu.focused = id;

            $('.page').addClass('invisible');
            $('#page_' + id).removeClass('invisible');
        }
    }
}