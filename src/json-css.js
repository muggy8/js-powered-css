"use strict";
(function(jsonCSS){
	jsonCSS.prototype.render = function(){
		// initialize the style renderer
		var styleRenderer = document.querySelector("#json-css") || (function (){
			var styleEle = document.createElement("style");
			styleEle.setAttribute("id", "json-css");
			document.querySelector("body").appendChild(styleEle);
			return styleEle;
		})();
		
		var buildStyle = function(mediaQuery, styleList){
			
			//type cast the media query into an array
			if (typeof mediaQuery === "string" && mediaQuery){
				mediaQuery = [mediaQuery];
			}
			
			var ruleString = "";
			// if media query exists
			if (mediaQuery){
				ruleString += "@media ";
				mediaQuery.forEach(function(query, index, querySet){
					if (index > 0){
						ruleString += " and "
					}
					ruleString += "(" + query + ")";
				});
				ruleString += "{";
			}
			
			styleList.forEach(function(cssRule, index, array){
				//console.log(Object.keys(cssRule));
				ruleString += cssRule.selector.toString() + "{";
				Object.keys(cssRule.rules).forEach(function(ruleName, ruleIndex, ruleStylings){
					ruleString += ruleName + ":" + cssRule.rules[ruleName] + ";";
				});
				ruleString += "}";
			});
			
			if (mediaQuery){
				ruleString += "}";
			}
			return ruleString;
		};
		
		var renderedRuleset = "";
		this.styleSet.forEach(function(querySet, index, JSONstyleSheet){
			renderedRuleset += buildStyle(querySet.mediaQuery, querySet.ruleCluster);
		});
		
		styleRenderer.innerHTML = renderedRuleset;
	}
})(window.jsonCSS || 
	(window.jsonCSS = function(styles){
		this.styleSet;
		
		if (typeof styles == "string"){
			console.log("this is a URL and I'm not ready for that yet");
		}
		if (typeof styles == "object"){
			this.styleSet = styles || [];
		}
	})
)

/*

	
*/