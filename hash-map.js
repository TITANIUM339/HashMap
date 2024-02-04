class HashMap {
    #loadFactor;
    #capacity;
    #buckets;

    constructor(capacity = 1, loadFactor = 0.75) {
        this.#capacity = capacity < 1 ? 1 : capacity;
        this.#loadFactor =
            loadFactor > 1 || loadFactor < 0.25 ? 0.75 : loadFactor;
        this.#buckets = new Array(this.#capacity);
    }

    static hash(string) {
        let hashCode = 0;

        const primeNumber = 31;

        for (let i = 0; i < string.length; i++) {
            hashCode = primeNumber * hashCode + string.charCodeAt(i);
        }

        return hashCode;
    }

    length() {
        return this.#buckets.reduce((total, value) => {
            if (value) return total + 1;

            return total;
        }, 0);
    }

    set(key, value) {
        // Increase buckets capacity by 10 when it reaches loadFactor.
        if ((this.length() + 1) / this.#buckets.length >= this.#loadFactor) {
            const newArray = this.#buckets.concat(new Array(10));

            this.#buckets = newArray;
        }

        const index = key % this.#buckets.length;

        if (!this.#buckets[index]) {
            this.#buckets[index] = { key, value };
        } else if (this.#buckets[index]?.key === key) {
            this.#buckets[index].value = value;
        } else {
            console.error("Collision");
        }
    }

    get(key) {
        const index = key % this.#buckets.length;

        const bucket = this.#buckets[index];

        if (bucket && bucket.key === key) return bucket.value;

        return null;
    }

    has(key) {
        const index = key % this.#buckets.length;

        if (isNaN(index)) return false;

        return this.#buckets[index]?.key === key ? true : false;
    }

    remove(key) {
        const index = key % this.#buckets.length;

        if (isNaN(index)) return false;

        if (this.#buckets[index]?.key === key) {
            this.#buckets[index] = null;
            return true;
        }

        return false;
    }

    clear() {
        this.#buckets.fill(null);
    }

    keys() {
        return this.#buckets.reduce((total, value) => {
            if (value) total.push(value.key);

            return total;
        }, []);
    }

    values() {
        return this.#buckets.reduce((total, value) => {
            if (value) total.push(value.value);

            return total;
        }, []);
    }

    entries() {
        return this.#buckets.reduce((total, value) => {
            if (value) total.push([value.key, value.value]);

            return total;
        }, []);
    }
}
