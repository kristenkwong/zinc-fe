import React, { useState, useEffect, useLayoutEffect } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Menu from "@material-ui/core/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import MenuItem from "@material-ui/core/MenuItem";
import { Link } from "react-router-dom";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import FilterListIcon from "@material-ui/icons/FilterList";
import CloseIcon from "@material-ui/icons/Close";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import "./feed.css";
import { getSubscriptions } from "services/categories/api";
import { getCompanies } from "services/companies/api";

export interface FilterMenuProps {}

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200,
      },
    },
  },
  bar: {
    boxShadow: "none",
    zIndex: 30000,
    position: "absolute",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    color: "#000000",
  },
  anchor: {
    position: "fixed",
    top: 50,
  },
  menucontainer: {
    position: "relative",
  },
  popup: {
    position: "fixed",
    height: "100vh",
    width: "100vw",
    top: 0,
    left: 0,
    backgroundColor: "rgb(0, 0, 0, 0.3)",
    zIndex: 99999,
    display: "none",
  },
  popup_container: {
    backgroundColor: "white",
    height: "auto",
    maxHeight: "90vh",
    overflow: "scroll",
    overflowX: "hidden",
    width: "500px",
    position: "absolute",
    margin: 0,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 100000,
  },
  show_category: {
    display: "block",
  },
  show_company: {
    display: "block",
  },
  categories: {},
  companies: { paddingTop: 20 },
  filter_buttons: { padding: 30 },
  goButton: {
    right: 30,
    position: "absolute",
  },
  goButtonContainer: {
    display: "inline-block",
    marginTop: 30,
    bottom: 10,
  },
  closeButton: { right: 0, position: "absolute" },
  selectedCategory: {
    border: "2px solid #f15690 !important",
  },
  selectedCompany: {
    border: "2px solid #f15690 !important",
  },
  button: {
    variant: "contained",
    color: "primary",
    cursor: "pointer",
    padding: "5px 7px 3px 7px",
    borderRadius: 7,
    marginLeft: 7,
    backgroundColor: "#d4d4d4",
    border: "2px solid #d4d4d4",
    MozUserSelect: "none",
    WebkitUserSelect: "none",
    msUserSelect: "none",
    display: "inline-block",
    fontSize: "14px",
    marginTop: 7,
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

const FilterMenu: React.FC<FilterMenuProps> = ({}) => {
  const classes = useStyles();

  type companyObj = {
    company: string;
  };

  const emptyArray: string[] = [];

  const [state, setState] = useState({
    categories: emptyArray,
    companies: emptyArray,
  });

  const [search, setSearch] = useState("");

  async function componentDidMount() {
    let categoriesRes = await getSubscriptions();
    let companiesRes = await getCompanies();

    if (categoriesRes.ok && companiesRes.ok) {
      let categoriesBody = await categoriesRes.json();
      let companiesBody = await companiesRes.json();
      let categories: string[] = categoriesBody.data.resources;
      let companies: string[] = companiesBody.data.resources;

      for (let i = 0; i < categories.length; i++) {
        categories[i] = categories[i].toLowerCase();
      }
      categories = categories.filter((v, i) => categories.indexOf(v) === i);

      companies = companies.filter((val) => val); // Filter out empty string

      setState({
        categories: categories,
        companies: companies,
      });
    }
  }

  useEffect(() => {
    componentDidMount();
  }, []);

  const SHOW_CATEGORY_POPUP = classes.show_category;

  const [showCategoryPopup, setShowCategoryPopup] = useState("");
  const [selectedCategories, setSelectedCategories] = useState(emptyArray);
  const [selectedCompanies, setSelectedCompanies] = useState(emptyArray);

  const [anchorEl, setAnchorEl] = useState(null);
  const [menuAnchorClass, setMenuAnchorClass] = useState("");

  const addCategory = (category: string) => {
    setSelectedCategories([...selectedCategories, category]);
  };

  const removeCategory = (category: string) => {
    setSelectedCategories(
      selectedCategories.filter((item) => item !== category)
    );
  };

  const addCompany = (company: string) => {
    setSelectedCompanies([...selectedCompanies, company]);
  };

  const removeCompany = (company: string) => {
    setSelectedCompanies(selectedCompanies.filter((item) => item !== company));
  };

  const clearFilters = () => {
    setSelectedCompanies([]);
    setSelectedCategories([]);
  };

  const handleCategoryFilterClick = (category: string) => {
    if (selectedCategories.indexOf(category) === -1) {
      addCategory(category);
    } else {
      removeCategory(category);
    }
  };

  const handleCompanyFilterClick = (company: string) => {
    if (selectedCompanies.indexOf(company) === -1) {
      addCompany(company);
    } else {
      removeCompany(company);
    }
  };

  const checkPositionToAnchor = (e: any) => {
    let position = document
      .getElementById("filter-menu-div")!
      .getBoundingClientRect();
    if (position.y < 50) {
      setMenuAnchorClass(classes.anchor);
    } else if (position.y >= 50) {
      setMenuAnchorClass("");
    }
  };

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCategoryClick = (event: any) => {
    if (showCategoryPopup === SHOW_CATEGORY_POPUP) {
      setShowCategoryPopup("");
    } else {
      setShowCategoryPopup(SHOW_CATEGORY_POPUP);
    }
  };

  const submitSearch = () => {
    console.log("search " + search);
    window.location.href = "/feed?title=" + search;
  };

  const handleSearchKeyPress = (event: any) => {
    if (event.key === "Enter") {
      submitSearch();
    }
  };

  // Anchor filter menu to top
  useLayoutEffect(() => {
    window.addEventListener("scroll", checkPositionToAnchor);

    return () => window.removeEventListener("scroll", checkPositionToAnchor);
  }, []);

  return (
    <React.Fragment>
      <div
        id="filter-menu-popup"
        className={`${showCategoryPopup} ${classes.popup}`}
      >
        <div
          id="popup-container"
          className={classes.popup_container}
          onClick={(event: any) => {
            return;
          }}
        >
          <Button
            className={classes.closeButton}
            endIcon={<CloseIcon />}
            onClick={handleCategoryClick}
          >
            Close
          </Button>
          <div className={classes.filter_buttons}>
            <i>Filter by</i>
            <div className={classes.categories}>
              <h3>Categories</h3>
              {state.categories.sort().map((tag: string) => (
                <span
                  key={tag}
                  className={`"noselect" ${classes.button} ${
                    selectedCategories.indexOf(tag) !== -1
                      ? classes.selectedCategory
                      : ""
                  }`}
                  onClick={() => handleCategoryFilterClick(tag)}
                >
                  {tag}
                </span>
              ))}
              {state.categories.length === 0 ? "Nothing here yet!" : ""}
            </div>
            <div className={classes.companies}>
              <h3>Companies</h3>
              {state.companies.sort().map((tag: string) => (
                <span
                  key={tag}
                  className={`"noselect" ${classes.button} ${
                    selectedCompanies.indexOf(tag) !== -1
                      ? classes.selectedCompany
                      : ""
                  }`}
                  onClick={() => handleCompanyFilterClick(tag)}
                >
                  {tag}
                </span>
              ))}
              {state.companies.length === 0 ? "Nothing here yet!" : ""}
            </div>
            <div className={classes.goButtonContainer}>
              <Button onClick={clearFilters} variant="outlined">
                Clear Filters
              </Button>
              <Button
                component={Link}
                to={
                  "/feed?" +
                  (selectedCategories.length !== 0
                    ? "categories=" + selectedCategories.join(",")
                    : "") +
                  (selectedCompanies.length !== 0
                    ? "&companies=" + selectedCompanies.join(",")
                    : "")
                }
                onClick={handleCategoryClick}
                className={classes.goButton}
                endIcon={<ArrowForwardIcon />}
                size="large"
                variant="contained"
                color="secondary"
              >
                Go
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div id="filter-menu-div" className={classes.menucontainer}>
        <AppBar className={classes.bar + " " + menuAnchorClass}>
          <Toolbar id="tool-bar-container">
            <Button
              onClick={handleCategoryClick}
              startIcon={<FilterListIcon />}
            >
              Filter
            </Button>
            <div className={classes.grow} />
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
                onKeyUp={handleSearchKeyPress}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </Toolbar>
        </AppBar>
      </div>
    </React.Fragment>
  );
};

export default FilterMenu;
