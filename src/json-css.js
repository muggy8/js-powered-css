(function(jsonCSS){
	"use strict";
	
	jsonCSS.styleSet = jsonCSS.styleSet || [];
	
	jsonCSS.render = function(){
		
		// initialize the style renderer
		var styleRenderer = document.querySelector("#json-css") || (function (){
			var styleEle = document.createElement("style");
			styleEle.setAttribute("id", "json-css");
			document.querySelector("body").appendChild(styleEle);
			return styleEle;
		})();
		
		var buildStyle = function(styleList){
			var ruleString = "";
			styleList.forEach(function(cssRule, index, array){
				//console.log(Object.keys(cssRule));
				ruleString += cssRule.selector.toString() + "{";
				Object.keys(cssRule.rules).forEach(function(ruleName, ruleIndex, ruleStylings){
					ruleString += ruleName + ":" + cssRule.rules[ruleName] + ";";
				});
				ruleString += "}";
			});
			return ruleString;
		};
		
		styleRenderer.innerHTML = buildStyle(this.styleSet);
	}
})(window.jsonCSS || (window.jsonCSS = {}))