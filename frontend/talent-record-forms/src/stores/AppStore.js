"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mobx_state_tree_1 = require("mobx-state-tree");
var LookupDataStore_1 = require("./LookupDataStore");
var TalentsStore_1 = require("./TalentsStore");
var ViewStore_1 = require("./ViewStore");
exports.AppStore = mobx_state_tree_1.types.model({
    LookupDataStore: mobx_state_tree_1.types.optional(LookupDataStore_1.LookupDataStore, {}),
    TalentDataStore: mobx_state_tree_1.types.optional(TalentsStore_1.default, {}),
    ViewStore: mobx_state_tree_1.types.optional(ViewStore_1.default, {}),
    Talent: mobx_state_tree_1.types.optional(TalentsStore_1.Talent, {})
}).named("ApplicationDataStore")
    .actions(function (self) {
    var SetTalent = function (item) {
        self.Talent = item;
    };
    var LoadTalentRecord = function (id) {
        self.TalentDataStore.GetTalentById(id);
    };
    return {
        SetTalent: SetTalent,
        LoadTalentRecord: LoadTalentRecord
    };
});
//# sourceMappingURL=AppStore.js.map