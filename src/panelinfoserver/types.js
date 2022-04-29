class Status {
    
    constructor(s, m) {
        this.s = s;
        this.m = m;
    }

    status() {
        return this.s;
    }

    message() {
        return this.m;
    }
}

class Pair {

    constructor(k, v = null) {
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
    constructor(i, t, d, dN, p=[]) {
        this._id = i;
        this._type = t;
        this._dependencyId = d;
        this._deliversToNodes = dN;
        this._inputParams = p;
    }

    id() {
        return this._id;
    }

    type() {
        return this._type;
    }

    dependencyId() {
        return this._dependencyId;
    }

    deliversToNodes() {
        return this._deliversToNOdes;
    }

    inputParams() {
        return this._inputParams;
    }
}

class TokenResponse {

    constructor(_token) {
        this._token = _token;
    }

    token() {
        return this._token;
    }

}

module.exports = {Status, Pair, Node, TokenResponse};



