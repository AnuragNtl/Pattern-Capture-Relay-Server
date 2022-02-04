class Status {

    constructor(s, msg) {

        this.s = s;
        this.msg = msg;
    }

    status() {
        return this.s;
    }

    message() {
        return this.msg;
    }


}

class Pair {
    constcuctor(k, v) {
        this.k = k;
        this.v = v;
    }

    key() {
        return this.k;
    }

    value() {
        return this.value;
    }


}

class Node {

    constructor(id, type, dependencyId, inputParams) {
        this.id = id;
        this.type = type;
        this.dependencyId= dependencyId;
        this.inputParams = inputParams;
    }

    setDeliversToNodes(deliversToNodes) {
        this.deliversToNodes = deliversToNodes;
    }
}



