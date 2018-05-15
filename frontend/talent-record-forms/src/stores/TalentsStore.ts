import {applySnapshot, flow, getParent, types} from "mobx-state-tree";
import {DataProviderFactory} from "./Common/DataProviderFactory";


export const Talent = types.model({
  Id: types.maybe(types.number),
  EmployeeId: types.optional(types.string, ""),
  Name: types.optional(types.string, ""),
  Manager: types.optional(types.string, ""),
  AreaHead: types.optional(types.string, ""),
  Division: types.optional(types.string, ""),
  Unit: types.optional(types.string, ""),
  Stream: types.optional(types.string, ""),
  Function: types.maybe(types.string),
  Location: types.optional(types.string, ""),
  Grade: types.optional(types.string, ""),
  BusinessRisk: types.optional(types.string, ""),
  FlightRisk: types.optional(types.string, ""),
  Performance: types.optional(types.string, ""),
  Potential: types.optional(types.string, ""),
  Movement: types.optional(types.string, ""),
  Requirements_01_category: types.optional(types.string, ""),
  Requirements_01_subcategory: types.optional(types.string, ""),
  Requirements_02_category: types.optional(types.string, ""),
  Requirements_02_subcategory: types.optional(types.string, ""),
  Notes: types.optional(types.string, "")
})
  .named("TalentRecord")
  .actions(self => {
    const changeEmployeeId = (id: string) => {
      self.EmployeeId = id;
    }

    const SetValueIfDifferent = (oldValue: string, newValue: string) => {
      if (oldValue != newValue)
        oldValue = newValue;
    }

    //Todo : think about the Person data . Do we need to include userId, Email and displayName
    const changeBusinessUnit = (businessUnit: string[]) => {
      const [division, stream, unit, location] = businessUnit;


      self.Division = division;
      self.Stream = stream;
      self.Unit = unit;
      self.Location = location;
    }

    const changeFunction = (newFunction: string) => {
      SetValueIfDifferent(self.Function, newFunction)
    }

    const changeGrade = (newGrade: string) => {
      SetValueIfDifferent(self.Grade, newGrade);
    }

    const changeBusinessRisk = (newBusinessRisk: string) => {
      SetValueIfDifferent(self.BusinessRisk, newBusinessRisk);
    }

    const changeFlightRisk = (newFlightRisk: string) => {
      SetValueIfDifferent(self.FlightRisk, newFlightRisk);
    }


    return {
      changeBusinessUnit,
      changeFunction,
      changeGrade,
      changeBusinessRisk,
      changeFlightRisk
    }
  })
  .views(self => ({

    get BusinessUnits() {
      console.log("BusinessUnits: called");
      const {Division, Unit, Stream, Location} = self;
      const result = [Division, Unit, Stream, Location];
      console.log(result)
      return result;
    },
    get DevelopmentRequirement01() {
      const {Requirements_01_category, Requirements_01_subcategory} = self;
      return [Requirements_01_category, Requirements_01_subcategory];
    },
    get DevelopmentRequirement02() {
      const {Requirements_02_category, Requirements_02_subcategory} = self;
      return [Requirements_02_category, Requirements_02_subcategory];
    },
    get Function() {
      return (self.Function) ? self.Function : "";
    },
    get Grade() {
      return (self.Grade) ? self.Grade : "";
    },
    get Movement() {
      return (self.Movement) ? self.Movement : "";
    },
    get PerformanceRating() {
      return (self.Performance) ? parseInt(self.Performance) : 2;
    },
    get PotentialRating() {
      return (self.Potential) ? parseInt(self.Potential) : 50;
    },
    get BusinessRisk() {
      return (self.BusinessRisk) ? self.BusinessRisk : "";
    },
    get FlightRisk() {
      return (self.FlightRisk) ? self.FlightRisk : "";
    }
  }));


const TalentsStore = types.model({
  items: types.optional(types.array(Talent), []),
  isLoading: types.optional(types.boolean, false)
}).actions(
  self => {

    const _dataProvider = DataProviderFactory.GetTalentsDataProvider();
    const LoadAllTalents = flow(function* LoadAllTalents() {

      try {
        const response = yield _dataProvider.GetAll();
        if (response) {
          console.log("Talents : " + JSON.stringify(response, null, 4));
          applySnapshot(self.items, response);
        }
      }
      catch (error) {
        console.log("Error retrieving Talents" + error);
        throw new Error(error.message);
      }
      finally {
        self.isLoading = false;
      }

    })
    const GetTalentById = flow(function* GetTalentById(id: number) {

      let talent;
      try {
        const response = yield _dataProvider.GetTalentById(id);
        if (response) {

          //Todo : ugly piece of code that needs to be refactored.
          console.log("Talents : " + JSON.stringify(response, null, 4));
          talent = Talent.create(response);
          applySnapshot(getParent(self, 1).Talent, talent);
          //Todo: move this code for the AppStore\ViewStore
          /* if (getParent(self, 1).Talent)
            applySnapshot(getParent(self, 1).Talent, talent);
          else
            getParent(self, 1).SetTalent(talent);*/
          console.log("Talent Record : " + JSON.stringify(talent, null, 4));
        }
      }
      catch (error) {
        console.log("Error retrieving Talents" + error);
        throw new Error(error.message);
      }
      finally {
        self.isLoading = false;
        return talent
      }

    })
    return {LoadAllTalents, GetTalentById}
  }
).actions(self => {
  const afterCreate = () => {
    console.log("Loading relevant Talent Records")
    self.LoadAllTalents().then(_ => console.log("Number of Loaded Talent Records :" + self.items.length));
  }

  return {
    afterCreate
  }
})


export default TalentsStore;
