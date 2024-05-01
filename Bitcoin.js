import React, { useEffect, useState } from "react";

import "./Bitcoin.css";
import { Button, Card, Form, Input, Select } from "antd";
function Bitcoin() {
  const apiurl = "https://api.coingecko.com/api/v3/exchange_rates";

  const [cryptolist, setcryptolist] = useState([]);

  const selectfirstvalue = "Bitcoin";

  const selectsecondvalue = "Ether";

  const [input, setinput] = useState("0");

  const [firstvalue, setfirstvalue] = useState(selectfirstvalue);

  const [secondvalue, setsecondvalue] = useState(selectsecondvalue);

  const [result, setresult] = useState("");

  //   Works when th ecomponent first time mountscrytolist
  useEffect(() => {
    fetchdata();
  }, []);

  async function fetchdata() {
    const response = await fetch(apiurl);

    const jsondata = await response.json();

    const data = jsondata.rates;

    // console.log(Object.entries(data));

    const temparr = Object.entries(data).map((item) => {
      return {
        value: item[1].name,
        label: item[1].name,
        rate: item[1].value,
      };
    });

    setcryptolist(temparr);
    console.log(temparr);

    // .forEach((item) => {
    //   const tempobj = {
    //     value: item[1].name,
    //     label: item[1].name,
    //     rate: item[1].value,
    //   };

    //   temparr.push(tempobj);

    // });
  }

  useEffect(() => {
    if (cryptolist.length == 0) return;

    const firstselectrate = cryptolist.find((item) => {
      return item.value == firstvalue;
    }).rate;
    const secondselectrate = cryptolist.find((item) => {
      return item.value == secondvalue;
    }).rate;

    const result = (input * secondselectrate) / firstselectrate;

    setresult(result);
  }, [input, firstvalue, secondvalue]);

  return (
    <div className="container">
      {/* Tille is an attribute but is a props */}
      <Card className="card-box" title={<h1>Crypto Converter</h1>}>
        <Form name={"basic"}>
          <Form.Item>
            <Input value={input} onChange={(e) => setinput(e.target.value)} />
          </Form.Item>
        </Form>
        <div className="select-box">
          <Select
            style={{ width: 120 }}
            options={cryptolist}
            defaultValue={selectfirstvalue}
            value={firstvalue}
            onChange={(value) => setfirstvalue(value)}
          />
          <Select
            style={{ width: 120 }}
            options={cryptolist}
            defaultValue={selectsecondvalue}
            value={secondvalue}
            onChange={(value) => setsecondvalue(value)}
          />
        </div>
        <p style={{ marginTop: 10 }}>
          {input} {firstvalue} ={result} {secondvalue}
        </p>
      </Card>
    </div>
  );
}

export default Bitcoin;
