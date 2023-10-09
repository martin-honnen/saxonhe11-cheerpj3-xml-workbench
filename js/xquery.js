async function xquery(input, xquery, inputType, resultsSelect) {

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
		  var xqueryExecutable = await xqueryCompiler.compile(xquery);

		  var xquerySelector = await xqueryExecutable.load();

		  await xquerySelector.setContextItem(contextItem);

		  var stringWriter = await new StringWriter;
		 
		  var destination = await saxonProcessor.newSerializer();
		  
		  await destination.setOutputWriter(stringWriter);
			
		  await xquerySelector.run(destination);

		  var stringResult = await stringWriter.toString(); // await CheerpJ3Helper.javaToString(stringWriter) 

		  setDocument(resultEditor, stringResult, 'xml');

		  writeResult(window.frames['current-result-frame'], stringResult);
	  }
	  catch (e) {
		  console.log(e);
      }
  }
  else {
	  console.log('Wait for Saxon HE library to be loaded.');
  }
    
}
