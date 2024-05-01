import { Card, Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";

import "./Bitcoin.css";
function Bitcoin2() {
  const apic = `https://api.coingecko.com/api/v3/exchange_rates`;

  const [cryptocoins, setcryptocoins] = useState([]);
  const [result, setresult] = useState("");

  const selecteditembox1 = "Bitcoin";

  const selecteditembox2 = "Ether";

  //   state Variable for handling Inputs

  const [inputval, setinputval] = useState("0");

  const [selectfirstval, setfirst] = useState(selecteditembox1);

  const [selectsecondval, setsecond] = useState(selecteditembox2);

  //   Handling the result

  //   console.log(selectfirstval);
  console.log(selectsecondval);

  useEffect(() => {
    fetchdata();
  }, []);

  async function fetchdata() {
    const fetchdat = await fetch(apic);

    const jsondata = await fetchdat.json();

    const data = jsondata.rates;

    // const temparr=[]
    // console.log(Object.entries(data));

    const temparr = Object.entries(data).map((item) => {
      return {
        // name: item[1].name,
        key: item[1].unit,
        label: item[1].name,
        rate: item[1].value,
      };
    });

    setcryptocoins(temparr);
    console.log(temparr);
  }

  //   useEffect(() => {
  //     if (cryptocoins.length == 0) return;
  //     const res1 = cryptocoins.find((item) => {
  //       return item.label == selectfirstval;
  //     }).rate;

  //     const res2 = cryptocoins.find((item) => {
  //       return item.label == selectsecondval;
  //     }).rate;

  //     const res = (inputval * res2) / res1;

  //     setresult(res);
  //   }, [inputval, selectfirstval, selectsecondval]);
  const maincon = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100vh",
    background: "black",
  };

  //   const opt = [
  //     {
  //       value: "jack",
  //       label: "Jack",
  //     },
  //     {
  //       value: "lucy",
  //       label: "Lucy",
  //     },
  //     {
  //       value: "Yiminghe",
  //       label: "yiminghe",
  //     },
  //     {
  //       value: "disabled",
  //       label: "Disabled",
  //       disabled: true,
  //     },
  //   ];

  return (
    <div style={maincon}>
      {/* Importing css from Bitcoin.css */}
      <Card
        className="card-box"
        style={{ textAlign: "center" }}
        title={<h1>Coin Exchanger</h1>}
      >
        <Form name={"basic"}>
          <Form.Item>
            <Input
              placeholder="Enter the coin"
              onChange={(e) => setinputval(e.target.value)}
              value={inputval}
            />
          </Form.Item>
        </Form>

        <div className="select-box">
          <Select
            defaultValue={selecteditembox1}
            options={cryptocoins}
            style={{ width: 120 }}
            onChange={(value) => setfirst(value)}
            value={selectfirstval}
          />
          <Select
            defaultValue={selecteditembox2}
            options={cryptocoins}
            style={{ width: 120 }}
            onChange={(value) => setsecond(value)}
            value={selectsecondval}
          />
        </div>

        <p style={{ marginTop: "10px", fontSize: "20px" }}>
          {inputval} {selectfirstval} = {result} {selectsecondval}
        </p>
      </Card>
    </div>
  );
}

export default Bitcoin2;
