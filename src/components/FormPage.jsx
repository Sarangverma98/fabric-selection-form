import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Checkbox,
  ListItemText,
  FormControl,
  InputLabel,
  Select,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import dropdownData from "../data/dropdownData";

const FormPage = () => {
  const [formData, setFormData] = useState({
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
    productionPerDayPerMachine: "",
    totalOrderQuantity: "",
    fabrics: [
      {
        fabricName: "",
        perPieceRequirement: "",
        unit: "M",
        processes: [],
        colorQuantity: [{ color: "", quantity: "" }],
        stagesToBeSkipped: [],
      },
    ],
    trims: [],
    accessories: [],
    chinaFabrics: "true",
    chinaFabricsList: [],
    majorFabric: "None",
  });

  const [showData, setShowData] = useState(false);

  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      ...formData,
    });
    navigate("/form-data", {state: formData})
  };

  const handleRadioChange = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      chinaFabrics: event.target.value,
    }));
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedFabrics = [...formData.fabrics];
    updatedFabrics[index][name] = value;
    setFormData({ ...formData, fabrics: updatedFabrics });
  };

  const handleProcessChange = (index, e) => {
    const { value } = e.target;
    const updatedFabrics = [...formData.fabrics];
    updatedFabrics[index].processes = value;
    setFormData({ ...formData, fabrics: updatedFabrics });
  };

  const handleColorQuantityChange = (index, i, e) => {
    const { name, value } = e.target;
    const updatedFabrics = [...formData.fabrics];
    updatedFabrics[index].colorQuantity[i][name] = value;
    setFormData({ ...formData, fabrics: updatedFabrics });
  };

  const handleAddColorQuantity = (index) => {
    const updatedFabrics = [...formData.fabrics];
    updatedFabrics[index].colorQuantity.push({ color: "", quantity: "" });
    setFormData({ ...formData, fabrics: updatedFabrics });
  };

  const handleAddFabric = () => {
    const newFabric = {
      fabricName: "",
      perPieceRequirement: "",
      unit: "M",
      processes: [],
      colorQuantity: [{ color: "", quantity: "" }],
      stagesToBeSkipped: [],
    };
    setFormData((prev) => ({
      ...prev,
      fabrics: [...prev.fabrics, newFabric],
    }));
  };

  return (
    <Container maxWidth="lg" sx={{my:"2rem"}}>
      <Box component="form" onSubmit={handleSubmit} sx={{}}>
        <Typography variant="h4" textAlign="center" sx={{ mb: "2rem" }}>
          T&A DATA SUBMISSION FORM
        </Typography>

        <Box
          sx={{
            display: "flex",
            width: "62%",
            mb: "1.5rem",
          }}
        >
          <TextField
            label="Start Date"
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleInputChange}
            required
            sx={{
              width: "50%",
            }}
          />
          <TextField
            label="End Date"
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleInputChange}
            required
            sx={{
              width: "50%",
              ml: "1.5rem",
            }}
          />
        </Box>

        <Box sx={{ mb: "1.5rem" }}>
          <TextField
            label="Production Per Day Per Machine"
            type="number"
            name="productionPerDayPerMachine"
            value={formData.productionPerDay}
            onChange={handleInputChange}
            required
            sx={{
              width: "30%",
            }}
          />
        </Box>

        <Box sx={{ mb: "1.5rem" }}>
          <TextField
            label="Total Order Quantity"
            type="number"
            name="totalOrderQuantity"
            value={formData.totalOrderQuantity}
            onChange={handleInputChange}
            required
            sx={{
              width: "30%",
            }}
          />
        </Box>

        <Box
          sx={{
            backgroundColor: "#f0f0f0",
            width: "100%",
            mb: "1.5rem",
            py: "3rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "4px",
          }}
        >
          {formData.fabrics.map((fabric, index) => {
            // Collect selected fabric names excluding the current index
            const selectedFabricNames = formData.fabrics
              .filter((_, i) => i !== index)
              .map((f) => f.fabricName);

            // Filter out the already selected fabric names
            const availableFabricNames = dropdownData.fabricName.filter(
              (name) => !selectedFabricNames.includes(name)
            );

            return (
              <Box
                key={index}
                sx={{
                  marginBottom: "2rem",
                  backgroundColor: "White",
                  borderRadius: "4px",
                  p: "2rem",
                  width: "85%",
                }}
              >
                <Box
                  sx={{
                    width: "35%",
                    mb: "1.5rem",
                  }}
                >
                  <FormControl fullWidth>
                    <InputLabel>Fabric Name</InputLabel>
                    <Select
                      value={fabric.fabricName}
                      onChange={(e) => handleChange(index, e)}
                      name="fabricName"
                    >
                      {availableFabricNames.map((fabricName) => (
                        <MenuItem key={fabricName} value={fabricName}>
                          {fabricName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    mb: "1.5rem",
                  }}
                >
                  <Box
                    sx={{
                      width: "35%",
                    }}
                  >
                    <TextField
                      label="Per Piece Requirement"
                      value={fabric.perPieceRequirement}
                      onChange={(e) => handleChange(index, e)}
                      name="perPieceRequirement"
                      fullWidth
                      style={{ marginTop: "10px" }}
                    />
                  </Box>

                  <Box
                    sx={{
                      ml: "2rem",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <FormLabel sx={{ color: "black" }}>Choose Unit</FormLabel>
                    <FormControl component="fieldset">
                      <RadioGroup
                        row
                        name="unit"
                        value={fabric.unit}
                        onChange={(e) => handleChange(index, e)}
                        sx={{
                          display: "inline-flex",
                          flexDirection: "row",
                          ml: "1rem",
                        }}
                      >
                        <FormControlLabel
                          value="M"
                          control={<Radio />}
                          label="M"
                        />
                        <FormControlLabel
                          value="Kg"
                          control={<Radio />}
                          label="Kg"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Box>
                </Box>

                <Box
                  sx={{
                    width: "35%",
                    mb: "1.5rem",
                  }}
                >
                  <FormControl fullWidth style={{ marginTop: "10px" }}>
                    <InputLabel>Processes</InputLabel>
                    <Select
                      multiple
                      value={fabric.processes}
                      onChange={(e) => handleProcessChange(index, e)}
                      name="processes"
                      renderValue={(selected) => selected.join(", ")}
                    >
                      {dropdownData.processes.map((process) => (
                        <MenuItem key={process} value={process}>
                          <Checkbox
                            checked={fabric.processes.includes(process)}
                          />
                          <ListItemText primary={process} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                {formData?.fabrics?.[index]?.processes?.length > 0 && (
                  <Box
                    sx={{
                      mb: "2rem",
                      display: "flex",
                    }}
                  >
                    {formData?.fabrics?.[index]?.processes?.map(
                      (item, processIndex) => (
                        <Box
                          key={processIndex}
                          sx={{
                            display: "flex",
                            ml: processIndex > 0 ? "1rem" : "0",
                            border: "1px solid black",
                            px: ".5rem",
                            borderRadius: "5px",
                            alignItems: "center",
                          }}
                        >
                          <Box>{item}</Box>
                        </Box>
                      )
                    )}
                  </Box>
                )}

                <Box
                  sx={{
                    width: "35%",
                    mb: "1.5rem",
                  }}
                >
                  {fabric.colorQuantity.map((colorQty, i) => (
                    <Box
                      key={i}
                      sx={{
                        display: "flex",
                        width: "100%",
                        mb: "1rem",
                      }}
                    >
                      <TextField
                        label="Color"
                        value={colorQty.color}
                        onChange={(e) => handleColorQuantityChange(index, i, e)}
                        name="color"
                        fullWidth
                        style={{ marginRight: "1.5rem" }}
                      />
                      <TextField
                        label="Quantity"
                        value={colorQty.quantity}
                        onChange={(e) => handleColorQuantityChange(index, i, e)}
                        name="quantity"
                        fullWidth
                      />
                    </Box>
                  ))}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      onClick={() => handleAddColorQuantity(index)}
                      sx={{
                        marginTop: "10px",
                        textTransform: "none",
                        color: "primary",
                        border: "1px solid black",
                        borderRadius: "4px",
                        //   backgroundColor:"secondary"
                      }}
                    >
                      Add more Color and Quantity
                    </Button>
                  </Box>
                </Box>

                <Box
                  sx={{
                    width: "35%",
                    mb: "1.5rem",
                  }}
                >
                  <FormControl fullWidth style={{ marginTop: "10px" }}>
                    <InputLabel>Stages to be Skipped</InputLabel>
                    <Select
                      multiple
                      value={fabric.stagesToBeSkipped}
                      onChange={(e) => handleChange(index, e)}
                      name="stagesToBeSkipped"
                      renderValue={(selected) => selected.join(", ")}
                    >
                      {dropdownData.stagesToBeSkipped.map((stage) => (
                        <MenuItem key={stage} value={stage}>
                          <Checkbox
                            checked={fabric.stagesToBeSkipped.includes(stage)}
                          />
                          <ListItemText primary={stage} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                {formData?.fabrics?.[index]?.stagesToBeSkipped?.length > 0 && (
                  <Box
                    sx={{
                      mb: "1.5rem",
                      display: "flex",
                    }}
                  >
                    {formData?.fabrics?.[index]?.stagesToBeSkipped?.map(
                      (item, stageIndex) => (
                        <Box
                          key={stageIndex}
                          sx={{
                            display: "flex",
                            ml: stageIndex > 0 ? "1rem" : "0",
                            border: "1px solid black",
                            px: ".5rem",
                            borderRadius: "5px",
                            alignItems: "center",
                          }}
                        >
                          <Box>{item}</Box>
                        </Box>
                      )
                    )}
                  </Box>
                )}
              </Box>
            );
          })}

          <Button
            variant="outlined"
            color="primary"
            onClick={handleAddFabric}
            sx={{ marginTop: "20px", textTransform: "none", borderColor:"black" }}
          >
            Add more Fabric
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            mb: "1.5rem",
            alignItems: "center",
          }}
        >
          <FormLabel sx={{ color: "black" }}>
            Is China Fabric present ?
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            value={formData.chinaFabrics}
            onChange={handleRadioChange}
            name="radio-buttons-group"
            sx={{
              display: "inline-flex",
              flexDirection: "row",
              ml: "1rem",
            }}
          >
            <FormControlLabel value="true" control={<Radio />} label="Yes" />
            <FormControlLabel value="false" control={<Radio />} label="No" />
          </RadioGroup>
        </Box>

        {formData.chinaFabrics === "true" && (
          <Box
            sx={{
              mb: "1.5rem",
              width: "30%",
            }}
          >
            <FormControl fullWidth>
              <InputLabel>China Fabrics</InputLabel>
              <Select
                multiple
                value={formData.chinaFabricsList}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    chinaFabricsList: e.target.value,
                  }))
                }
                renderValue={(selected) => selected.join(", ")}
              >
                {formData.fabrics.map((fabric) => (
                  <MenuItem key={fabric.fabricName} value={fabric.fabricName}>
                    <Checkbox
                      checked={formData.chinaFabricsList.includes(
                        fabric.fabricName
                      )}
                    />
                    <ListItemText primary={fabric.fabricName} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {formData?.chinaFabricsList?.length > 0 && (
              <Box
                sx={{
                  mb: "2rem",
                  display: "flex",
                  mt: "1.5rem",
                }}
              >
                {formData?.chinaFabricsList?.map((item, listIndex) => (
                  <Box
                    key={listIndex}
                    sx={{
                      display: "flex",
                      ml: listIndex > 0 ? "1rem" : "0",
                      border: "1px solid black",
                      px: ".5rem",
                      borderRadius: "5px",
                      alignItems: "center",
                    }}
                  >
                    <Box>{item}</Box>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        )}

        <Box
          sx={{
            mb: "1.5rem",
            width: "30%",
          }}
        >
          <FormControl fullWidth>
            <InputLabel>Major Fabric</InputLabel>
            <Select
              value={formData.majorFabric}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  majorFabric: e.target.value,
                }))
              }
            >
              <MenuItem value="None">None</MenuItem>
              {formData?.fabrics?.map((fabric) => (
                <MenuItem key={fabric.fabricName} value={fabric.fabricName}>
                  {fabric.fabricName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box
          sx={{
            mb: "1.5rem",
            width: "30%",
          }}
        >
          <FormControl fullWidth>
            <InputLabel>Trims</InputLabel>
            <Select
              multiple
              value={formData.trims}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, trims: e.target.value }))
              }
              renderValue={(selected) => selected.join(", ")}
            >
              {dropdownData.trims.map((trim) => (
                <MenuItem key={trim} value={trim}>
                  <Checkbox checked={formData.trims.includes(trim)} />
                  <ListItemText primary={trim} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {formData?.trims?.length > 0 && (
          <Box
            sx={{
              mb: "1.5rem",
              display: "flex",
            }}
          >
            {formData?.trims?.map((item, trimIndex) => (
              <Box
                key={trimIndex}
                sx={{
                  display: "flex",
                  ml: trimIndex > 0 ? "1rem" : "0",
                  border: "1px solid black",
                  px: ".5rem",
                  borderRadius: "5px",
                  alignItems: "center",
                }}
              >
                <Box>{item}</Box>
              </Box>
            ))}
          </Box>
        )}

        <Box
          sx={{
            mb: "1.5rem",
            width: "30%",
          }}
        >
          <FormControl fullWidth>
            <InputLabel>Accessories</InputLabel>
            <Select
              multiple
              value={formData.accessories}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  accessories: e.target.value,
                }))
              }
              renderValue={(selected) => selected.join(", ")}
            >
              {dropdownData.accessories.map((accessory) => (
                <MenuItem key={accessory} value={accessory}>
                  <Checkbox
                    checked={formData.accessories.includes(accessory)}
                  />
                  <ListItemText primary={accessory} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {formData?.accessories?.length > 0 && (
          <Box
            sx={{
              mb: "1.5rem",
              display: "flex",
            }}
          >
            {formData?.accessories?.map((item, accIndex) => (
              <Box
                key={accIndex}
                sx={{
                  display: "flex",
                  ml: accIndex > 0 ? "1rem" : "0",
                  border: "1px solid black",
                  px: ".5rem",
                  borderRadius: "5px",
                  alignItems: "center",
                }}
              >
                <Box>{item}</Box>
              </Box>
            ))}
          </Box>
        )}

        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default FormPage;
