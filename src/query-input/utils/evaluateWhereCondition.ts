export function evaluateWhereCondition(row: any, where: string): boolean {
  if (where.startsWith('NOT')) {
    return !evaluateWhereCondition(row, where.split("NOT ")[1])
  } else if (where.includes('AND')) {
    return where.split(' AND ').every(exp => evaluateWhereCondition(row, exp));
  } else if (where.includes('OR')) {
    return where.split(' OR ').some(exp => evaluateWhereCondition(row, exp));
  }
  return evaluateExp(row, where);
}

const evaluateExp = (row: any, exp: string) => {
  const [leftOperand, operator] = exp.split(' ', 2);
  const rightOperand = exp.split(operator)[1].trim().replace(/'/g, "");
  if(leftOperand && operator && rightOperand) {
    switch(operator) {
      case '=': 
        return row[leftOperand]?.toString() === rightOperand?.toString();
      case '>': 
        return row[leftOperand] > rightOperand;
      case '>=': 
        return row[leftOperand] >= rightOperand;
      case '<': 
        return row[leftOperand] < rightOperand;
        case '<=': 
        return row[leftOperand] <= rightOperand;
      default:
        return false
    }
  }
  return false;
}