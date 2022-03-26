// gauge chart

function gaugeChart(sample)
{
    d3.json("samples.json").then((data) => {
        let result = data.metadata.filter(sampleResult => sampleResult.id == sample)[0];

        let wfreq = result.wfreq;

        var data = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: wfreq,
                title: { 
                    text: "Scrubs per Week",
                    font: {
                        size: 16
                    } 
                },
                type: "indicator",
                mode: "gauge+number",
                number: {
                    font: {
                      size: 50  
                    }
                },
                gauge: {
                    axis: { 
                        range: [null, 9],
                        dtick: 1,
                        ticks: "inside" 
                    },

                    bar: {
                        color: "#1f77b4",
                    }
                }
            }
        ];
        
        var layout = { 
            title: "<b>Belly Button Washing Frequency</b>" 
        };

        Plotly.newPlot('gauge', data, layout);
        
    })
}