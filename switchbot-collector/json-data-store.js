const fs = require("fs");

class JsonDataStore {
  constructor(storage_path = "./data/data.json", max_store = 1440) {
    this.storage_path = storage_path;
    this.data = [];
    this.max_store = max_store;

    if (fs.existsSync(this.storage_path)) {
      this.load();
    }
  }

  all() {
    return this.data;
  }

  append(d) {
    this.data.push(d);
    while (this.data.length > this.max_store) {
      this.data.shift();
    }
    this.save();
  }

  load() {
    try {
      this.data = JSON.parse(fs.readFileSync(this.storage_path));
    } catch (e) {
      console.log(e.message)
      this.data = [];
    }
  }

  save() {
    try {
      fs.writeFileSync(this.storage_path, JSON.stringify(this.data));
    }
    catch (e) {
      console.log(e.message);
    }
  }
}

module.exports = JsonDataStore;