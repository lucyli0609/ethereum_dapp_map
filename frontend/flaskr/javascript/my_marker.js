var my_marker = (function() {
  _my_marker.add_new_marker = function(the_map, the_position){
    var marker = new google.maps.Marker({position: the_position, map: the_map});
    return marker;
  }
})();
