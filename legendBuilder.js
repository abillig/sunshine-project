function legendBuilder(){

  //in building the legend, I have to feed into the d3 loop information containing
  //the relevant gradients and for each of them, the associated data range
  //corresponding to the map.
  //to minimize what I pass into d3, I take the geo object and strip out its values.
  //then i build a scale that can take in a number 1-9 and spit out a pair of values representing the range.
  //those (hex value, min and max) are combined into an array and added to an array of arrays.
  //using d3, i loop through those arrays of hex + data values and each time, add to the legend.


var legendArrays = [
  ["0-10", "#d73027"],
  ["10-12", '#fee08b'],
  ["12-14", '#1a9850']
]

    var legend = d3.select('#legend').append('svg').attr('class', 'legend-mobile-local')
      .attr('viewBox', function(){if(window.innerWidth < 1000) return '50 0 220 120'
        else return '50 0 220 120';} )
      .append("g")
      .style('position', 'absolute')
      .selectAll("g")
      .data(legendArrays)
      .enter()
      .append('g')
      .attr('transform', function(d, i) {
        var height = '6';
        var x = i * 18 + 120;
        var y = 18;
        return 'translate(' + x + ',' + y + ')';
      })

      legend.append('rect')
      .attr('width', '15')
      .attr('height', '15')
      .attr('x', '-45')
      .attr('y', '28')
      .style('fill', function(d){ return d[1];});

      legend.append('text')
      .attr('x', '-55')
      .attr('y', '15')
      .style('font-size', function(){if(window.innerWidth < 900) return '1.5vh'
        else
          return '1.5vh';} )
          .html(function(d, i) {
            if (i==0){
          return 'COLLECTIVE GRADE*'
        }})
          .style('fill', 'black')
          // .attr("transform", "rotate(-65)" );


        legend.append('text')
        .attr('x', '-87')
        .attr('y', '-10')
        // .attr('width', '30%')
        .style('font-size', function(){if(window.innerWidth < 1000) return '1.8vh'
          else
            return '1.7vh';} )
        .html(function(d) {
        return d[0]  })
         .classed('legend-labels', true)
          .style('font-style', 'italic')
          .style('fill', 'black')
          .attr("transform", "rotate(-65)" );
      //
      //     .attr('transform', function(d, i) {
      //     var height = '6';
      //     var x = i * 170 / 2.7 - 50;
      //     var y = -25;
      //     return 'translate(' + x + ',' + y + ')';
      // });
}
