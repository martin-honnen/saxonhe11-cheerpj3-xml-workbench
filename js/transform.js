async function transform(input, xslt, inputType, resultsSelect) {

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
		  
		  
		  var xsltExecutable = await xsltCompiler.compile(await new StreamSource(await new StringReader(xslt)));

		  var xslt30Transformer = await xsltExecutable.load30();


		  if (contextItem !== null) {
			await xslt30Transformer.setGlobalContextItem(contextItem);
		  }
		  
		  var stringWriter = await new StringWriter();
		  
		  var destination = await xslt30Transformer.newSerializer(stringWriter);
		  
		  if (contextItem === null) {
			  await xslt30Transformer.callTemplate(null, destination);
		  }
		  else {
			  await xslt30Transformer.applyTemplates(contextItem, destination);
		  }
		  
		  var stringResult = await stringWriter.toString(); // await CheerpJ3Helper.javaToString(stringWriter); 

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
