/**
 * Can recognize entities according to a given function.
 * @constructor
 * @param {string} entityName - The name of produced entities.
 * @param {function} func - The function to be executed, in the format
 *                          `( text: string ): { value: any, index: number }[]`
 * @param {number} [priority=0] - Priority given to extracted entities.
 * 
 * 
 * Example:
 * 
 *  ```javascript
 *  var hasFoo = function( text ) {
 *    var startIndex = 0, searchIndex = 0;
 *    var detected = [];
 *    var search = ' foo ';
 *    do {
 *      startIndex += searchIndex;
 *      searchIndex = text.substring( startIndex ).toLoweCase().indexOf( search );
 *      if ( searchIndex >= 0 ) {
 *        detected.push( { value: search, index: searchIndex } );
 *      }
 *    } while ( searchIndex >= 0 );
 *    return detected; 
 *  };
 *  ```
 * 
 */
Bravey.FunctionEntityRecognizer = function(entityName, func, priority) {

  /**
   * Returns the recognizer entity name.
   * @returns {string} The entity name.
   */
  this.getName = function() {
    return entityName;
  };

  /**
   * Returns all found entities in a sentence. Returned entities value is <tt>string</tt>.
   * @param {string} string - The sentence to be checked.
   * @param {Entity[]} [out=[]] - The array in which the found entities will be added.
   * @returns {Entity[]} The set of found entities.
   */
  this.getEntities = function(string, out) {
    if (!out) out = [];
    var found = func(string); // array of { value: any, index: number }
    for (var i in found) {
      var f = found[i];
      out.push({
        position: f.index || -1,
        entity: entityName,
        value: f.value || null,
        string: f.value || null,
        priority: priority || 0
      });
    }
    return out;
  };

};