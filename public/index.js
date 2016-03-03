$(function() {
  $('#buttonSubmit').on('click', function() {
    console.log('on click yo');
    $.ajax({
      type: 'GET',
      url: '/api/',
      contentType: 'application/json',
      data: {
        keyword: document.getElementById('keyword').value
      },
      error: function(req, status, err) {
        $('#info').html('<p>An error has occurred:' + status + '-' + err + '</p>');
      },
      success: function(data) {
        $('#stage').text(document.getElementById('keyword').value + " correlation with " + data.companyName + ' is: ' + data.corr);
        console.log(data);
      }
    });
  });
});
