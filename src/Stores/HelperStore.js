class HelperClass {
  constructor() {}
  getSortiesAndConges = (db_employees, limit = 65536) => {
    const sorties = [],
      conges = [];

    db_employees &&
      db_employees.length > 0 &&
      db_employees.map(employee => {
        const new_emp = {
          id: employee.id,
          firstName: employee.firstName,
          lastName: employee.lastName
        };
        employee.sorties &&
          sorties.push(
            ...(employee.sorties.map(sortie => ({
              ...sortie,
              employee: new_emp
            })))
          );
        employee.conges &&
          conges.push(
            ...(employee.conges.map(conge => ({ ...conge, employee: new_emp })))
          );
      });

    sorties.sort(
      (sortie1, sortie2) =>
        new Date(sortie2.id) - new Date(sortie1.id)
    );
    conges.sort(
      (conge1, conge2) =>
        new Date(conge2.start_date) - new Date(conge1.start_date)
    );

    return {
      sorties: sorties.slice(0, limit),
      conges: conges.slice(0, limit)
    };
  };
}

const HelperStore = new HelperClass();
export { HelperStore };
