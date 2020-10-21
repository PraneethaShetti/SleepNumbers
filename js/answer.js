
/**
 * Given an array of Person objects, returns the root PersonTreeNode (the CEO).
 * @param {Person[]} employees - An array of Person objects representing all the employees of the company.
 * @returns {PersonTreeNode} The CEO of the organization.
 */
function generateTree(employees) {
  /**
   * @ignore
   * INSTRUCTIONS:
   * 1. ONLY edit this function and nothing else!.
   *
   * 2. Analyze the Person.js and PersonTreeNode.js files.
   *
   * 3. Parse the `employees` array and create a single PersonTreeNode
   *    object representing the CEO (the Person with no `manager`).
   *    All PersonTreeNode object's `directReports` arrays should contain
   *    PersonTreeNode's for their direct reports...creating a tree.
   *
   * 4. Refresh or click the 'Retry Test' button to rerun the test.
   *
   *  Feel free to create any additional functions in this file as needed.
   */

  var ceo = null; // Should be a PersonTreeNode object at the end;

  // YOUR CODE STARTS HERE
  const manager = {};

  // creating list of managers and their direct reportees
  for(let emp in employees){ 
    const employee = employees[emp];
    const node = new PersonTreeNode(employee);

    if(employee.manager == null){
      // manager for a ceo will be no-one hence null
      ceo = node;
    }else{
      const { id: managerId } = employee.manager;

      /**
       * Checking if manager object has a key
       * if key exists then push direct reportee to existing manager
       * else create a new entry of manager and add reportee 
       */
      if(manager.hasOwnProperty(managerId)){
        manager[managerId].push(node); 
      }else{
        manager[managerId] = [node]
      }
    }
  }
 
  /**
   * Method to generate tree object
   * @param {PersonTreeNode} node 
   * This method calls itself recursively
   * to generate manager and direct reportee
   * object.
   */
  function generateTree(node) {
    const empId = node.person.id;
    if(manager.hasOwnProperty(empId)){
      node.directReports = manager[empId];
    }else{
      return;
    }
    node.directReports.forEach(reportee => {
      generateTree(reportee)
    });
  }

  /** 
   * Calling method with root node as CEO
   * to generate whole tree
   */
  generateTree(ceo);

  // YOUR CODE ENDS HERE

  return ceo;
};
