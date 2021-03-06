import * as React from "react";
import { withStyles } from '@material-ui/core/styles';
import {
  Grid, Button, Card,
  CardHeader, CardContent,
   CircularProgress
} from '@material-ui/core'
import BackupOutlinedIcon from '@material-ui/icons/BackupOutlined'
import styles from './GraphStyle'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { uploadCsv, fetchAllData } from '../../store/actions/graphActions';
import { isEmpty } from '../../utils/common';
import GraphRecharts from './GraphRechart';

class GraphPage extends React.Component {
  constructor(props) {
    super(props);
  }
  getAllData = () => {
    this.props.fetchAllData();
  }

  onUploadFile = (event) => {
    event.preventDefault()
    const errs = []
    const files = Array.from(event.target.files)
    const formData = new FormData()
    const types = ['text/csv']

    files.forEach((file, i) => {
      if (types.every(type => file.type !== type)) {
        errs.push(`'${file.type}' is not a supported format`)
      }

      if (file.size > 10485760) {
        errs.push(`'${file.name}' is too large, please pick a smaller file`)
      }

      document.documentName = file.name
      if (isEmpty(errs)) {
        formData.append('file', file)

        this.props.uploadCsv(formData);
        // this.setState({ uploadedImage: formData, uploading: true })
      }
    })
  }

  render() {
    const { classes, isLoading, csvData } = this.props;

    return (
      <div className={classes.root}>
        <Grid container
          direction="row"
          justify="center"
          alignItems="center"

        >
          <Grid item xs={12}>

            <Card>
              <CardHeader title="NIFTY50 Draw Down Chart"
                action={
                  <>
                    <Button
                      color="primary"
                      variant="contained"
                      style={{ marginLeft: '10px' }}
                      startIcon={<BackupOutlinedIcon />}
                      component="label">
                      {isLoading ? <CircularProgress color="white" /> : 'Upload File'}
                      <input style={{ display: 'none' }} type="file" id='file' name="file" onChange={this.onUploadFile} />
                    </Button>
                    <Button color="primary"
                      variant="contained"
                      style={{ marginLeft: '10px' }}
                      onClick={() => this.getAllData()}
                    >
                      Draw Dropdown Chart
        </Button>
                  </>
                }
              />
              <CardContent >
                <GraphRecharts csvData={csvData} classes={classes} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );


  }
}
function mapStateToProps(state) {
  const { graphReducer = {} } = state
  return {
    isLoading: graphReducer.isFileUploading,
    csvData: graphReducer.csvData,

  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      uploadCsv,
      fetchAllData
      // add other watcher sagas to this object to map them to props
    },
    dispatch
  )
}

export default connect(mapStateToProps,
  mapDispatchToProps)
  (withStyles(styles)(GraphPage));