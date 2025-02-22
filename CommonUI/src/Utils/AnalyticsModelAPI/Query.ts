import AnalyticsDataModel from 'Common/AnalyticsModels/BaseModel';
import CompareBase from 'Common/Types/Database/CompareBase';
import InBetween from 'Common/Types/Database/InBetween';
import NotNull from 'Common/Types/Database/NotNull';
import Search from 'Common/Types/Database/Search';
import { JSONObject, JSONValue } from 'Common/Types/JSON';

type Query<TBaseModel extends AnalyticsDataModel | JSONObject> = {
    [P in keyof TBaseModel]?:
        | JSONValue
        | Search
        | InBetween
        | NotNull
        | CompareBase;
};

export default Query;
