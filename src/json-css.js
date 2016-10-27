"use strict";
(function(jsonCSS){
	jsonCSS.prototype.render = function(styleID){
		// initialize the style renderer
		var styleID = styleID || "json-css";
		var styleRenderer = document.querySelector("#" + styleID) || (function (){
			var styleEle = document.createElement("style");
			styleEle.setAttribute("id", styleID);
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
		
		var renderedMeadlessOnce = false;
		this.styleSet.forEach(function(querySet, index, JSONstyleSheet){
			console.log(typeof querySet.mediaQuery);
			if (typeof querySet.mediaQuery != "undefined"){ // there's a media query with this set
				renderedRuleset += buildStyle(querySet.mediaQuery, querySet.ruleCluster);
			}
			else{ // it's just a set without a media query
				if (renderedMeadlessOnce){ // gotta just return if its already done work out
					return;
				}
				console.log( JSONstyleSheet);
				renderedRuleset += buildStyle("", JSONstyleSheet);
				renderedMeadlessOnce = true;
			}
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