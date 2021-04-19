//Using D3 library to read the data in samples.json
    d3.json("samples.json").then((data) => {
    var samples= data.samples;
    var sampledata= samples.filter(object => object.id == sample);
    var result= sampledata[0]
    var ids = result.otu_ids;
    var labels = result.otu_labels;
    var values = result.sample_values;
//Build the bar plot with the sample data
     var bar_data =[
      {
// Slice the first 10 objects for plotting
        y:ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
        x:values.slice(0,10).reverse(),
        text:labels.slice(0,10).reverse(),
        type:"bar",
        orientation:"h"
      }
    ];
// Apply the group bar mode to the layout
    var layout = {
      margin: { t: 30, l: 150 }
    };

    Plotly.newPlot("bar", bar_data, layout);
  });

   
 
