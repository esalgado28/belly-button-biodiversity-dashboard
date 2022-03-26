

// initialize dashboard
function initialize()
{
    // use d3 to read data
    d3.json("samples.json").then((data) => {
        let sampleNames = data.names;

        sampleNames.forEach(element => {
            select.append("option").text(element).property("value", element);
        });
    console.log(data);

    // call functions to use first data entry on loading
        demInfo(sampleNames[0]);

        barChart(sampleNames[0]);

        bubbleChart(sampleNames[0]);

        gaugeChart(sampleNames[0]);
    })
    
    var select = d3.select("#selDataset");  
}

initialize();

// update dashboard
function optionChanged(item)
{
    d3.select("#sample-metadata").html("")  // clear out metadata
    demInfo(item);

    barChart(item);

    bubbleChart(item);

    gaugeChart(item);
}

// populate meta data
function demInfo(sample)
{
    d3.json("samples.json").then((data) => {
        let result = data.metadata.filter(sampleResult => sampleResult.id == sample)[0];

       Object.entries(result).forEach(([key, value]) => {
        d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        }) 
    })
}

// build graphs
function barChart(sample)
{
    d3.json("samples.json").then((data) => {
        let result = data.samples.filter(sampleResult => sampleResult.id == sample)[0];

        let yticks = result.otu_ids.slice(0, 10).map(id => `OTU ${id}`);
        let heights = result.sample_values.slice(0, 10);
        let text = result.otu_labels.slice(0, 10);

        let params = {
            y: yticks.reverse(),
            x: heights.reverse(),
            text: text.reverse(),
            type: "bar",
            orientation: "h"
        };

        let layout = {
            title: "Top 10 Belly Button Bacteria"
        };

        Plotly.newPlot("bar", [params], layout);
    })
}

function bubbleChart(sample)
{
    d3.json("samples.json").then((data) => {
        let result = data.samples.filter(sampleResult => sampleResult.id == sample)[0];

        let otu_ids = result.otu_ids;
        let values = result.sample_values;
        let otu_labels = result.otu_labels;

        let params = {
            y: values,
            x: otu_ids,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: values,
                color: otu_ids,
                colorscale: "Earth"
            }
        };

        let layout = {
            title: "Bacteria Cultures",
            hovermode: "closest",
            xaxis: {title: "OTU ID"}
        };

        Plotly.newPlot("bubble", [params], layout);
    });
}