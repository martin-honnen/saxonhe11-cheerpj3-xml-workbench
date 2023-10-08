async function xpath(input, xpathCode, inputType, resultsSelect) {
  if (saxonInitialized) {
	  try {
		  var contextItem = null;
		  if (inputType === 'JSON') {
			contextItem = await jsonBuilder.parseJson(input);
		  }
		  else if (inputType === 'XML') {
			var streamSource = await new StreamSource(await new StringReader(input));
			
			contextItem = await docBuilder.build(streamSource);
		  }	
		  var xpathResult = await xpathProcessor.evaluate(xpathCode, contextItem);
		  
		  console.log(xpathResult);
		  
		  console.log(await (await xpathResult.getClass()).getName());
			  
		  var stringResult = await xpathResult.toString(); //CheerpJ3Helper.javaToString(xpathResult);
		  
		  setDocument(resultEditor, stringResult, 'xml');

		  writeResult(window.frames['current-result-frame'], stringResult);
	  }
	  catch (e) {
		  console.log(e);
		  console.log(await e.toString(), await e.getMessage());
		  debugger
	  }
  }
  else {
	  console.log('Wait for Saxon HE library to be loaded.');
	  alert('Wait for Saxon HE library to be loaded.');
  }

}
