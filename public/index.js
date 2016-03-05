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
        data.corr.forEach((dataObj) => {
          $('#stage').append('<div>' + document.getElementById('keyword').value + ' correlations are: ' + dataObj.keyword + ': ' + dataObj.correlation + '</div>');
        });
      }
    });
  });
});
