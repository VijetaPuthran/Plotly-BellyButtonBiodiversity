function jsonData(sample) {
    d3.json("samples.json").then((data) => {
      var metadata= data.metadata;
      var sampledata= metadata.filter(object => object.id == sample);
      var result= sampledata[0];
      var panel = d3.select("#sample-metadata");
      panel.html("");
      Object.entries(result).forEach(([key, value]) => {
        panel.append("h6").text(`${key}: ${value}`);
      });    
    });
  }

//Function defined to plot the bar graph
function plots(sample) {
//Using D3 library to read the data in samples.json
    d3.json("samples.json").then((data) => {
    var samples= data.samples;
    var sampledata= samples.filter(object => object.id == sample);
    var result= sampledata[0];
    var ids = result.otu_ids;
    var labels = result.otu_labels;
    var values = result.sample_values;
//Bubble chart displaying each sample
var bdata = [
    {
      x: ids,
      y: values,
      text: labels,
      mode: "markers",
      marker: {
        color: ids,
        size: values,
        }
    }
    ];
var blayout = {
        margin: { t: 0 },
        xaxis: { title: "OTU ID" },
        hovermode: "closest",
        };
Plotly.plot("bubble", bdata, blayout);

//Build the bar plot with the sample data
    var data =[
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
    Plotly.newPlot("bar", data, layout);
  });
}
