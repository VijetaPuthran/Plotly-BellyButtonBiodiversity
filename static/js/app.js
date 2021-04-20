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
      console.log(result.wfreq);

      var data = [
        {
          domain: { x: [0, 1], y: [0, 1] },
          value: result.wfreq,
          title: { text: "<b>Belly Button Washing Frequency<b><br>Scrubs per Week" },
          type: "indicator",
          mode: "gauge+number",
          delta: { reference: 400 },
          gauge: { axis: { range: [0, 9] },bar:{color:'red'} }
        }
      ];
      
      var layout = { width: 600, height: 400 };
      Plotly.newPlot('gauge', data, layout);

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
//Initialize the page with a default plot
function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");
    
    // Use the list of sample names to populate the select options
    d3.json("samples.json").then((data) => {
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
    
      // Use the first sample from the list to build the initial plots
      const firstSample = sampleNames[0];
      plots(firstSample);
      jsonData(firstSample);
    });
    }
//This function is called when a dropdown menu item is selected        
function optionChanged(newData) {
    plots(newData);
    jsonData(newData);
    }       
// Initialize the page with a default plot
init();