type Indexed<T = any> = {
    [key in string]: T;
};

export function merge(lhs: Indexed, rhs: Indexed): Indexed {
    for (let p in rhs) {
        if (!rhs.hasOwnProperty(p)) {
            continue;
        }

        try {
            if (rhs[p].constructor === Object) {
                rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);

            } else if(rhs[p].constructor === Array) {
                rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
            } else {
                lhs[p] = rhs[p];
            }
        } catch(e) {
            lhs[p] = rhs[p];
        }
    }

    return lhs;
}
