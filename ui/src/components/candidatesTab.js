import React from "react";
import PropTypes from "prop-types";
import deburr from "lodash/deburr";
import Downshift from "downshift";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import Chip from "@material-ui/core/Chip";
import { connect } from "react-redux";

import { updateCandidatePreferences } from "../actions";

function renderInput(inputProps) {
  const { InputProps, classes, ref, ...other } = inputProps;

  return (
    <TextField
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.inputRoot,
          input: classes.inputInput
        },
        ...InputProps
      }}
      {...other}
    />
  );
}

function renderSuggestion(suggestionProps) {
  const {
    suggestion,
    index,
    itemProps,
    highlightedIndex,
    selectedItem
  } = suggestionProps;
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || "").indexOf(suggestion) > -1;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400
      }}
    >
      {suggestion}
    </MenuItem>
  );
}
renderSuggestion.propTypes = {
  highlightedIndex: PropTypes.number,
  index: PropTypes.number,
  itemProps: PropTypes.object,
  selectedItem: PropTypes.string,
  suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired
};

function getSuggestions(value, suggestions, { showEmpty = false } = {}) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;
  return inputLength === 0 && !showEmpty
    ? []
    : suggestions.filter(suggestion => {
        const keep =
          count < 5 &&
          suggestion.slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
}

function DownshiftMultiple(props) {
  const { classes } = props;
  const [inputValue, setInputValue] = React.useState("");
  const selectedItem = props.candidatePreference
    ? props.candidatePreference
    : [];
  console.log("selected", props);
  function handleKeyDown(event) {
    if (
      selectedItem.length &&
      !inputValue.length &&
      event.key === "Backspace"
    ) {
      props.dispatch(
        updateCandidatePreferences(
          props.companyId,
          selectedItem.slice(0, selectedItem.length - 1)
        )
      );
    }
  }

  function handleInputChange(event) {
    setInputValue(event.target.value);
  }

  function handleChange(item) {
    let newSelectedItem = [...selectedItem];
    if (newSelectedItem.indexOf(item) === -1) {
      newSelectedItem = [...newSelectedItem, item];
    }
    setInputValue("");

    props.dispatch(
      updateCandidatePreferences(props.candidateId, newSelectedItem)
    );
  }

  const handleDelete = item => () => {
    const newSelectedItem = [...selectedItem];
    newSelectedItem.splice(newSelectedItem.indexOf(item), 1);
    props.dispatch(
      updateCandidatePreferences(props.candidateId, newSelectedItem)
    );
  };

  return (
    <Downshift
      id="downshift-multiple"
      inputValue={inputValue}
      onChange={handleChange}
      selectedItem={selectedItem}
    >
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        isOpen,
        inputValue: inputValue2,
        selectedItem: selectedItem2,
        highlightedIndex
      }) => {
        const { onBlur, onChange, onFocus, ...inputProps } = getInputProps({
          onKeyDown: handleKeyDown,
          placeholder: "Select multiple profiles"
        });
        return (
          <div className={classes.container}>
            {renderInput({
              fullWidth: true,
              classes,
              label: "Profile Order",
              InputLabelProps: getLabelProps(),
              InputProps: {
                startAdornment: selectedItem.map(item => (
                  <Chip
                    key={item}
                    tabIndex={-1}
                    label={item}
                    className={classes.chip}
                    onDelete={handleDelete(item)}
                  />
                )),
                onBlur,
                onChange: event => {
                  handleInputChange(event);
                  onChange(event);
                },
                onFocus
              },
              inputProps
            })}

            {isOpen ? (
              <Paper className={classes.paper} square>
                {getSuggestions(inputValue2, props.suggestionOptions).map(
                  (suggestion, index) =>
                    renderSuggestion({
                      suggestion,
                      index,
                      key: suggestion,
                      itemProps: getItemProps({ item: suggestion }),
                      highlightedIndex,
                      selectedItem: selectedItem2
                    })
                )}
              </Paper>
            ) : null}
          </div>
        );
      }}
    </Downshift>
  );
}

DownshiftMultiple.propTypes = {
  classes: PropTypes.object.isRequired
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  container: {
    flexGrow: 1,
    position: "relative"
  },
  paper: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0
  },
  chip: {
    margin: theme.spacing(0.5, 0.25)
  },
  inputRoot: {
    flexWrap: "wrap"
  },
  inputInput: {
    width: "auto",
    flexGrow: 1
  },
  divider: {
    height: theme.spacing(2)
  }
}));

const CompanyPreferenceSelector = props => {
  const classes = useStyles();

  return <DownshiftMultiple classes={classes} {...props} />;
};

const mapStateToProps = (store, ownProps) => {
  const { candidateId } = ownProps;
  return { candidatePreference: store.candidates[candidateId] };
};
const ConnectedCompanyPreferenceSelector = connect(mapStateToProps)(
  CompanyPreferenceSelector
);

const CandidateTabRow = props => {
  return (
    <div style={{ display: "flex", margin: "20px 0px" }}>
      {" "}
      <div
        style={{
          width: "30%",
          marginTop: "15px",
          marginLeft: "15px",
          fontSize: "24px",
          fontFamily: "Barlow",
          color: "rgba(76, 76, 76, 0.89)"
        }}
      >
        {" "}
        {props.candidateName}{" "}
      </div>
      <div style={{ width: "60%", fontSize: "24px" }}>
        <ConnectedCompanyPreferenceSelector
          suggestionOptions={props.companies}
          candidateId={props.candidateName}
        />
      </div>
    </div>
  );
};

const CandidateTab = props => {
  const getUniqueStudentNames = companyData => {
    const uniqueStudents = {};
    const companyIds = Object.keys(companyData);
    for (let i = 0, len = companyIds.length; i < len; i++) {
      const companyId = companyIds[i];
      const candidates = companyData[companyId].candidates;
      const companyName = companyId;
      for (let j = 0, len = candidates.length; j < len; j++) {
        const candidateName = candidates[j].candidateName;
        if (uniqueStudents[candidateName] == null) {
          uniqueStudents[candidateName] = [companyId];
        } else {
          uniqueStudents[candidateName].push(companyId);
        }
      }
    }
    return uniqueStudents;
  };

  const uniqueStudents = getUniqueStudentNames(props.companyData);
  return (
    <div>
      {Object.keys(uniqueStudents).map(studentName => (
        <CandidateTabRow
          key={studentName}
          candidateName={studentName}
          companies={uniqueStudents[studentName]}
        />
      ))}
    </div>
  );
};

const mapStateToPropsCandidates = store => {
  return {
    companyData: store.companies
  };
};

export default connect(mapStateToPropsCandidates)(CandidateTab);
