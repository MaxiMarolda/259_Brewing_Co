import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import configuration from "../configuration";
import styles from "./Groups.module.css";

const Group = () => {
  /* const getGroups = async () => {
    const response = await fetch(configuration.url + "groups")
      .then((response) => response.json())
      .then((data) => {
        return data.sort((a, b) => Number(a.name > b.name) * 2 - 1);
      });
    return response;
  }; */

  const getGroups = async () => {
    const response = await fetch(configuration.url + "groups");
    return response.json();
  };

  const { data, status } = useQuery("groups", getGroups);

  return (
    <div>
      {status === "loading" && <div> Cargando equipos </div>}
      {status === "error" && <div> Error al cargar los equipos </div>}
      {status === "success" &&
        data?.map((group, index) => {
          return (
            <div key={group._id}>
              <ol>Groupo {group.name}</ol>
              {group?.teams &&
                group.teams.map((team) => {
                  <li>EQUIPO PG G E P</li>;
                  return (
                    <li class={styles.teamInfo}>
                      <span>{team.name}</span>
                      <span>PJ</span>
                      <span>G</span>
                      <span>E</span>
                      <span>P</span>
                      <span>{team.groupStage.gf}</span>
                      <span>{team.groupStage.gc}</span>
                      <span>DG</span>
                      {/* {team.name} PJ G E P {team.groupStage.gf} {team.groupStage.gc} DG */}
                    </li>
                  );
                })}
            </div>
          );
        })}
      <div></div>
    </div>
  );
};

export default Group;
