function checkString(input) {
    let stack = [];
    for (let i = 0; i < input.length; i++) {
        let elem = input[i];
        if (elem == '(') stack.push(1);
        if (elem == '[') stack.push(2);
        if (elem == '{') stack.push(3);
        if (elem == ')') {
            if (stack[stack.length - 1] != 1) return false;
            stack.pop();
        }
        if (elem == ']') {
            if (stack[stack.length - 1] != 2) return false;
            stack.pop();
        }
        if (elem == '}') {
            if (stack[stack.length - 1] != 3) return false;
            stack.pop();
        }
    }
    return stack.length == 0;
}

console.log(checkString('({}[])'));