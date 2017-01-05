"use strict";
(function(window, document){
	// global constants out here.... there's none yet
	
	window.jsonCSS = function(styles, elementID){
		//properties
		var id = elementID || "json-css";
		var renderedStylesList = [];
		var styleSet;
		
		//make property public
		this.styleSet = styleSet;
		
		// constructor
		if (typeof styles == "string"){
			console.log("this is a URL and I'm not ready for that yet");
		}
		if (typeof styles == "object"){
			styleSet = styles || [];
		}
		
		// public methods (instantiated every time this class is made)
		this.getID = function(){
			return id;
		}
		
		this.setID = function(identification){
			return id = identification;
		}
		
		this.render = function(styleID){
			// initialize the style renderer
			if (typeof styleID !== "string"){//check to see that styleID is indeed a string
				styleID = "";
				console.warn("Selector for render is not a string and is ignored.")
			}
			var styleID = styleID || id;
			var styleRenderer = document.querySelector("#" + styleID) || (function (){
				var styleEle = document.createElement("style");
				styleEle.setAttribute("id", styleID);
				document.querySelector("body").appendChild(styleEle);
				return styleEle;
			})();
			
			// save the element so we can clear it later
			if (renderedStylesList.indexOf(styleRenderer)){
				renderedStylesList.push(styleRenderer);
			}
			
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
					if (!cssRule.selector){return};
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
			styleSet.forEach(function(querySet, index, JSONstyleSheet){
				
				if (typeof querySet.mediaQuery != "undefined"){ // there's a media query with this set
					renderedRuleset += buildStyle(querySet.mediaQuery, querySet.ruleCluster);
				}
				else{ // it's just a set without a media query
					if (renderedMeadlessOnce){ // gotta just return if its already done work out
						return;
					}
					renderedRuleset += buildStyle("", JSONstyleSheet);
					renderedMeadlessOnce = true;
				}
			});
			
			styleRenderer.innerHTML = renderedRuleset;
		}
		
		this.clear = function(selector){
			if (typeof selector !== "string"){//check to see that selector is indeed a string
				selector = "";
				console.warn("Selector for clearer is not a string and is ignored.")
			}
			
			for (var i = 0; i < renderedStylesList.length; i++){
				var styleEle = renderedStylesList[i];
				
				try{ // we assume that whatever selector is there has an element attached
					if (!selector){
						styleEle.parentNode.removeChild(styleEle);
						renderedStylesList.splice(i, 1);
						i--;
					}
				
					if (selector && styleEle.getAttribute("id") == selector){
						styleEle.parentNode.removeChild(styleEle);
						renderedStylesList.splice(i, 1);
						i--;
					}
				}
				catch(e){
					// the element was removed by someone else somewhere else. therefore we just cut it form our data
					renderedStylesList.splice(i, 1);
					i--;
				}
			}
		}
	}
	
	// prototype functions here.... none yet...
})(this, document )