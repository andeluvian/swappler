angular.module('starter.directives', [])

/*

.directive('fallbackSrc', function () {
    return{
        link: function postLink(scope, element, attrs) {
            element.bind('error', function () {
                angular.element(this).attr("src", attrs.fallbackSrc);
            });
        }
    }
})
//========================================================================================
// This will set default image and substitutes original image if it is loaded successfully
// Usage: <img actual-src="{{url}}" ng-src="default.jpg"/>
// =======================================================================================
.directive('actualSrc', function () {
    return{
        link: function postLink(scope, element, attrs) {
            attrs.$observe('actualSrc', function(newVal, oldVal){
                 if(newVal != undefined){
                     var img = new Image();
                     img.src = attrs.actualSrc;
                     angular.element(img).bind('load', function () {
                         element.attr("src", attrs.actualSrc);
                     });
                 }
            });
 
        }
    }
});

*/
