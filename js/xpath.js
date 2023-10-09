async function xpath(input, xpathCode, inputType, resultsSelect) {
  if (saxonInitialized) {
	  var contextItem = null;
	  if (inputType === 'JSON') {
		contextItem = await jsonBuilder.parseJson(input);
	  }
	  else if (inputType === 'XML') {
		var streamSource = await new StreamSource(await new StringReader(input));
		
		contextItem = await docBuilder.build(streamSource);
	  }	
	  var xpathResult = await xpathProcessor.evaluate(xpathCode, contextItem);
	  
	  
	  var stringResult = await xpathResult.toString(); // await CheerpJ3Helper.javaToString(xpathResult);
	  
	  setDocument(resultEditor, stringResult, 'xml');

	  writeResult(window.frames['current-result-frame'], stringResult);
  }
  else {
	  console.log('Wait for Saxon HE library to be loaded.');
  }

}
