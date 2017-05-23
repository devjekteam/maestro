import React                                        from 'react';

export {default as CommoditiesTable} from './CommoditiesTable.js';
export {default as EditCommodity} from './EditCommodity.js';
export {default as NewCommodity} from './NewCommodity.js';

export default function Commodities(props) {
  console.log("hitting here");
  console.log(props.children);
  return (
    <div className="commodities-page">
      {props.children}
    </div>
  );
}
