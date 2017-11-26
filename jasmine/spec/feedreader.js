/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('have defined non-empty URLs', function() {
            for (var i=0; i<allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            }
         });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('have defined non-empty names', function() {
            for (var i=0; i<allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
         });
    });

    describe('The menu', function() {

         /* Test that ensures the menu element is
         * hidden by default. 
         */
         it('should be hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
         });

         /* Test that ensures the menu changes
          * visibility when the menu icon is clicked. 
          */
        it('should change visibility when menu icon is clicked', function() {
            // menu is visible on the first click
            $('.icon-list').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);

            // menu is hidden on the second click
            $('.icon-list').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    describe('Initial Entries', function() {
        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        beforeEach(function(done) {
            loadFeed(0,done);
         });

        it('should have at least a single .entry element within the .feed container', function() {
            // feed has children and that are of a class entry-link
            expect($('.feed .entry')).toBeDefined();
        });
    });

    describe('New Feed Selection', function() {

        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */

         // initiate the variables
         var text1, 
            text2;

        beforeEach(function(done) {
            //load the initial feed
            loadFeed(0);
            //read the title of the link on initiation
            text1 = $('.feed').children().first().text();
            // load a different feed
            loadFeed(1,function() {
                done();
            });
        });

        it('should change the content when a different feed is loaded', function() {
            // read the title of the link after the call in beforeEach
            text2 = $('.feed').children().first().text();
            // the titles should not be the same
            expect(text1).not.toBe(text2);
            // load back the initial feed
            loadFeed(0);
        });
    });
});
