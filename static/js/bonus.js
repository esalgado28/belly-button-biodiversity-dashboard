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
                title: { text: "Belly Button Washing Frequency" },
                type: "indicator",
                mode: "gauge+number",
                gauge: {
                    axis: { range: [null, 9] }
                }
            }
        ];
        
        var layout = { margin: { t: 0, b: 0 } };

        Plotly.newPlot('gauge', data, layout);
        
    })
}