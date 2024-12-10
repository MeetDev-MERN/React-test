import React from "react";
import useElixirs from "../../hooks/useElixirs";
import Tabel from "../../components/Tabel/Tabel";
import { Elixir } from "./Elixirs.type";
import { difficultyOptions } from "../../constants/ElixirDifficulty";

const ElixirsGrid = () => {
  const { elixirsData ,loading,handleApplyFilters,page,setPage,filters,setFilters,handleResetFilters,error} = useElixirs();

  return (
    <>
        <Tabel<Elixir>
          filterState={filters}
          setFilterState={setFilters}
          filters={[{type:'text', label:'Name'},{type:'text', label:'Ingredient'},{type:'text', label:'InventorFullName'},{type:'text', label:'Manufacturer'},{type:'dropdown', label:'Difficulty', options:difficultyOptions}]}
          handleApplyFilters={handleApplyFilters}
          handleResetFilters={handleResetFilters}
          error={error}
      data={elixirsData}
      columns={[
        { key: "name", title: "Name" },
        { key: "effect", title: "Effect" },
        { key: "difficulty", title: "Difficulty" },
        { key: "ingredients", title: "Ingredients" },
        {key:'inventors', title:"Inventors" },
        {key:"manufacturer", title:"Manufacturer" },
      ]}
      page={page}
      setPage={setPage}
      loading={loading}
    />
  
    </>

  );
};

export default ElixirsGrid;
