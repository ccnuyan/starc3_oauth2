  import querySerializer from './querySerializer';
  export default function(router, location) {
    var callback = location.query.callback;
    var q = location.query;
    delete q.callback;
    if (!callback) {
      router.push({
        pathname: 'home'
      });
    } else {
      var query = querySerializer(q);
      var location = query ? callback + '?' + query : callback;
      window.location = location;
    }
  }
