import React, { Component } from 'react';
import { withRouter } from 'react-router';
import * as linker from './UniversalLinker';
import * as globals from '../../Globals/Variables';
import * as PermissionManager from './PermissionManager';
import * as validationManager from './ValidationManager';
import { hasRequired, showRequired } from './RequiredFields';
import Select from 'react-select';
import { confirmAlert } from 'react-confirm-alert';
import * as AppModels from '../../AppModels';

class Help extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentMode: 'VIEW',
      helpInformation: {},
      permissionsLoaded: false,
      localPermissions: {
        [globals.UI_HELP]: false,
      },
    };
  }

  componentDidMount() {
    let resources = [];
    Object.keys(this.state.localPermissions).forEach(function (key) {
      resources.push({ assetType: globals.AT_FUNCTIONAL, assetId: key });
    });
    if (this.props.helpId) {
      this.getHelp(this.props.helpId);
    }
    PermissionManager.getPermission(this.props.services, resources).then((permissions) => {
      var localPermissions = Object.assign({}, this.state.localPermissions);

      permissions.forEach((item) => {
        localPermissions[item.ProcessId] = item.view;
      });

      this.setState({
        helpInformation: this.props.helpInformation,
        localPermissions,
        permissionsLoaded: true,
      });
    });

    this.getParentOptions();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.helpInformation === null ||
      this.state.helpInformation.HelpID !== this.props.helpInformation.HelpID ||
      this.state.helpInformation.value !== this.props.helpInformation.value
    ) {
      this.setState({
        helpInformation: this.props.helpInformation,
        checkRequired: false,
        componentMode: 'VIEW',
      });
    }
    if (this.props.helpId !== prevProps.helpId) {
      this.getHelp(this.props.helpId);
    }
  }

  getParentOptions = () => {
    const { helpInformation } = this.state;

    // fetch(`${this.props.services.Dashboard.URL}/HELP?$orderby=Title`,
    //   {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Ocp-Apim-Subscription-Key': this.props.services.Dashboard.subscription_key,
    //     },
    //     method: 'GET',
    //     credentials: 'include',
    //   }).then(
    //     res => {return(validationManager.ResolveHTTPResponse(res, 'Request Successful', 'Request Failed', res.ok ? true : false))}
    //   )
    const { services, user } = this.props;
    AppModels.getHelp({ services, user }, this.props.services.Dashboard.subscription_key, `${this.props.services.Dashboard.URL}/HELP?$orderby=Title`).then((response) => {
      if (!response.error) {
        let data = response.body ? response.body.value : null;
        let tempData = [];
        if (data) {
          tempData = data.map((obj) => {
            if (helpInformation.ParentID === obj.HelpID) {
              this.setState({
                parent: {
                  label: obj.Title,
                  value: obj.HelpID,
                },
              });
            }
            let wholeObject = obj;
            wholeObject.label = obj.Title;
            wholeObject.value = obj.HelpID;
            return wholeObject;
          });
        }
        this.setState({ parentOptions: tempData });
      }
    });
  };

  changeComponentMode = (newMode) => {
    if (newMode === 'EDIT') {
      this.setState({
        helpId: null,
        helpTitle: this.state.helpInformation.Title,
        helpText: this.state.helpInformation.Text,
        helpParentId: this.state.helpInformation.ParentID,
        parent: {
          value: this.state.helpInformation.ParentID,
          label: this.state.helpInformation.ParentTitle,
        },
        helpTags: this.state.helpInformation.Tags,
        helpCurrentValue: this.state.helpInformation.Current[0] ? this.state.helpInformation.Current[0].Text : null,
        checkRequired: false,
        componentMode: newMode,
      });
    } else {
      this.setState({
        helpId: null,
        helpTitle: null,
        helpText: null,
        helpParentId: null,
        helpTags: null,
        helpCurrentValue: null,
        checkRequired: false,
        componentMode: newMode,
      });
    }
  };

  handleSelectedHelp = (helpId) => {
    this.setState(
      {
        helpInformation: null,
      },
      () => {
        linker.UniversalHelp(helpId, 'popup', null);
      }
    );
  };

  handleAdd = () => {
    let requiredFields = ['helpId', 'helpTitle', 'helpText'];
    if (hasRequired(this.state, requiredFields)) {
      let body = {};

      body = {
        HelpID: this.state.helpId,
        Title: this.state.helpTitle,
        Text: this.state.helpText,
        ParentID: this.state.helpParentId,
        Tags: this.state.helpTags,
      };

      fetch(`${this.props.services.Dashboard.URL}/HELP`, {
        headers: {
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key': this.props.services.Dashboard.subscription_key,
          DDHFirm: this.props.user.DDHFirm,
        },
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(body),
      })
        .then((res) => {
          return validationManager.ResolveHTTPResponse(res, 'Request Successful', 'Request Failed', res.ok ? false : true);
        })
        .then((response) => {
          if (!response.error) {
            this.setState(
              {
                helpInformation: null,
              },
              () => {
                this.changeComponentMode('VIEW');
                this.handleSelectedHelp(this.state.helpId);
              }
            );
          }
        });
    } else {
      this.setState({ checkRequired: true });
    }
  };

  handleSave = () => {
    let requiredFields = ['helpTitle', 'helpText'];

    if (this.state.helpInformation.Current.length > 0) {
      requiredFields.push('helpCurrentValue');
    }
    if (hasRequired(this.state, requiredFields)) {
      let body = {};

      if (this.state.helpTitle !== this.state.helpInformation.Title) {
        body['Title'] = this.state.helpTitle;
      }
      if (this.state.helpText !== this.state.helpInformation.Text) {
        body['Text'] = this.state.helpText;
      }
      if (!this.state.helpParentId || this.state.helpParentId !== this.state.helpInformation.ParentID) {
        body['ParentID'] = this.state.helpParentId;
      }
      if (this.state.helpTags !== this.state.helpInformation.Tags) {
        body['Tags'] = this.state.helpTags;
      }

      fetch(`${this.props.services.Dashboard.URL}/HELP?id='${this.state.helpInformation.HelpID.replace(/\./g, '')}'`, {
        headers: {
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key': this.props.services.Dashboard.subscription_key,
          DDHFirm: this.props.user.DDHFirm,
        },
        method: 'PATCH',
        credentials: 'include',
        body: JSON.stringify(body),
      })
        .then((res) => {
          return validationManager.ResolveHTTPResponse(res, 'Request Successful', 'Request Failed', res.ok ? false : true);
        })
        .then((response) => {
          if (!response.error) {
            //If modifying the current value also need to make an update to the current value help
            if (this.state.helpCurrentValue && this.state.helpCurrentValue !== this.state.helpInformation.Current[0].Text) {
              body = {};
              body['Text'] = this.state.helpCurrentValue;

              fetch(`${this.props.services.Dashboard.URL}/HELP?id='${this.state.helpInformation.Current[0].HelpID.replace(/\./g, '')}'`, {
                headers: {
                  'Content-Type': 'application/json',
                  'Ocp-Apim-Subscription-Key': this.props.services.Dashboard.subscription_key,
                },
                method: 'PATCH',
                credentials: 'include',
                body: JSON.stringify(body),
              })
                .then((res) => {
                  return validationManager.ResolveHTTPResponse(res, 'Request Successful', 'Request Failed', true);
                })
                .then((response) => {
                  if (!response.error) {
                    this.getHelp(this.state.helpInformation.HelpID, this.state.helpInformation.value).then((r) => {
                      this.changeComponentMode('VIEW');
                    });
                  }
                });
            } else {
              this.getHelp(this.state.helpInformation.HelpID, this.state.helpInformation.value).then((r) => {
                this.changeComponentMode('VIEW');
              });
            }
          }
        });
    } else {
      this.setState({ checkRequired: true });
    }
  };

  handleDelete = () => {
    confirmAlert({
      title: <div className="unsaved-changes-header">Warning</div>,
      childrenElement: () => {
        return (
          <div className="unsaved-changes-div">
            <div>Are you sure you want to delete this help item?</div>
          </div>
        );
      },
      buttons: [
        { label: 'Cancel', onClick: () => {} },
        {
          label: 'Delete',
          onClick: () => {
            this.deleteHelp();
          },
        },
      ],
    });
  };

  deleteHelp = () => {
    fetch(`${this.props.services.DashboardAPI.URL}/help/delete?id=${this.state.helpInformation.HelpID}`, {
      headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': this.props.services.DashboardAPI.subscription_key,
      },
      method: 'DELETE',
      credentials: 'include',
    })
      .then((res) => {
        return validationManager.ResolveHTTPResponse(res, 'Request Successful', 'Request Failed', false);
      })
      .then((response) => {
        if (!response.error) {
          this.setState(
            {
              helpInformation: null,
            },
            () => {
              this.changeComponentMode('VIEW');
              window.history.back();
            }
          );
        }
      });
  };

  getHelp = (HelpId, value) => {
    return new Promise((resolve, reject) => {
      // fetch(`${this.props.services.DashboardAPI.URL}/help/get?id=${HelpId}&documentation=true${value ? "&value=" + value : ""}`, {
      //   headers: {
      //     "Content-Type": "application/json",
      //     "Ocp-Apim-Subscription-Key": this.props.services.DashboardAPI.subscription_key,
      //   },
      //   method: "GET",
      //   credentials: "include",
      // })
      //   .then((res) => {
      //     return validationManager.ResolveHTTPResponse(res, "Request Successful", "Request Failed", res.ok ? true : false);
      //   })
      const { services, user } = this.props;
      AppModels.getHelp(
        { services, user },
        this.props.services.DashboardAPI.subscription_key,
        `${this.props.services.DashboardAPI.URL}/help/get?id=${HelpId}&documentation=true${value ? '&value=' + value : ''}`
      )
        .then((response) => {
          if (!response.error) {
            let helpInformation = response.body;

            if (helpInformation.Help[0]) {
              helpInformation.Help[0]['value'] = value;
              this.setState(
                {
                  helpInformation: helpInformation.Help[0],
                },
                () => {
                  resolve();
                }
              );
            } else {
              this.setState(
                {
                  helpInformation: null,
                },
                () => {
                  resolve();
                }
              );
            }
          }
        })
        .catch((err) => {
          validationManager.CustomAlert(true, 'UNKNOWN ERROR', 'Exception Caught');
        });
    });
  };

  renderRelated = () => {
    let itemsToRender = [];
    let relatedItems = this.state.helpInformation.Related;

    relatedItems.map((item) => {
      if (item.Exists) {
        itemsToRender.push(
          <div className="help-description">
            <label
              className={'help-related-link'}
              onClick={() => {
                this.handleSelectedHelp(item.HelpID);
              }}
              title={'Navigate to related help (' + item.HelpID + ')'}
            >
              {item.Title}
            </label>
          </div>
        );
      }
      return;
    });

    return this.state.componentMode === 'VIEW' ? (
      relatedItems.length > 0 ? (
        <div className="help-section">
          <div className="help-title">
            <label>Related</label>
          </div>
          {itemsToRender}
        </div>
      ) : null
    ) : (
      <div className="help-section">
        <div className="help-title">
          <label>Related</label>
        </div>
        <div className="help-description">
          <textarea
            style={{ width: '100%', height: '75px' }}
            value={this.state.helpTags}
            onChange={(e) => {
              this.setState({ helpTags: e.target.value });
            }}
          />
        </div>
      </div>
    );
  };

  render() {
    let { checkRequired, componentMode } = this.state;
    let containerClass = 'help-container';
    switch (componentMode) {
      case 'EDIT':
        containerClass = 'help-container-edit';
        break;
      case 'NEW':
        containerClass = 'help-container-add';
        break;
    }
    return this.state.permissionsLoaded ? (
      <div className={containerClass}>
        {/* <div className='help-top-div'>
            <div className='help-top-div-title'>
              Help
            </div>
          </div> */}
        {this.state.localPermissions[globals.UI_HELP] ? (
          this.state.componentMode == 'VIEW' ? (
            <div className="help-top-div-buttons">
              <div
                className="generic-button-primary"
                title={'Edit help information'}
                onClick={() => {
                  this.changeComponentMode('EDIT');
                }}
              >
                Edit
              </div>
              <div
                className="generic-button-primary no-margin"
                title={'Create new help item'}
                onClick={() => {
                  this.changeComponentMode('NEW');
                }}
              >
                Add
              </div>
            </div>
          ) : (
            <div className="help-top-div-buttons">
              <div
                className="generic-button-secondary"
                title={'Cancel changes'}
                onClick={() => {
                  this.changeComponentMode('VIEW');
                }}
              >
                Cancel
              </div>
              {this.state.componentMode == 'EDIT' ? (
                <div className="generic-button-primary" title={'Delete help'} onClick={this.handleDelete}>
                  Delete
                </div>
              ) : null}
              <div className="generic-button-primary no-margin" title={'Save changes'} onClick={this.state.componentMode == 'EDIT' ? this.handleSave : this.handleAdd}>
                Save
              </div>
            </div>
          )
        ) : null}
        {this.state.componentMode !== 'NEW' ? (
          this.state.helpInformation ? (
            <div className="help-body">
              <div className="help-section">
                <div className="help-title">
                  {this.state.componentMode === 'VIEW' ? (
                    <label>{this.state.helpInformation.Title}</label>
                  ) : (
                    <input
                      style={{ width: '40%' }}
                      className={showRequired(checkRequired, this.state, 'helpTitle') ? 'help-title req' : 'help-title'}
                      value={this.state.helpTitle}
                      onChange={(e) => {
                        this.setState({ helpTitle: e.target.value });
                      }}
                    />
                  )}
                </div>
                <div className="help-description-edit">
                  {this.state.componentMode === 'VIEW' ? (
                    // <label>{this.state.helpInformation.Text} xx</label>
                    <pre className="help-modal-text">{this.state.helpInformation.Text}</pre>
                  ) : (
                    <textarea
                      style={{ width: '100%', height: '150px' }}
                      className={showRequired(checkRequired, this.state, 'helpText') ? 'req' : ''}
                      value={this.state.helpText}
                      onChange={(e) => {
                        this.setState({ helpText: e.target.value });
                      }}
                    />
                  )}
                </div>
              </div>
              {this.state.helpInformation.Current.length > 0 ? (
                <div className="help-section">
                  <div className="help-title">
                    <label>Current Value</label>
                    <label style={{ fontSize: '18px', fontWeight: 'normal', fontStyle: 'italic' }}>&nbsp;({this.state.helpInformation.value})</label>
                  </div>
                  <div className="help-description">
                    {this.state.componentMode === 'VIEW' ? (
                      <label>{this.state.helpInformation.Current[0].Text}</label>
                    ) : (
                      <textarea
                        style={{ width: '100%', height: '150px' }}
                        className={showRequired(checkRequired, this.state, 'helpCurrentValue') ? 'req' : ''}
                        value={this.state.helpCurrentValue}
                        onChange={(e) => {
                          this.setState({ helpCurrentValue: e.target.value });
                        }}
                      />
                    )}
                  </div>
                </div>
              ) : null}
              {this.state.helpInformation.Related.length > 0 && this.renderRelated()}

              {/* <div className="help-footer">
                {this.state.componentMode === 'VIEW' ? (
                  <div>
                    {this.state.helpInformation.ParentID && this.state.helpInformation.ParentTitle && <label style={{ fontSize: '18px', fontWeight: 'bold' }}>Parent:&nbsp;</label>}
                    {this.state.helpInformation.ParentID && this.state.helpInformation.ParentTitle && (
                      <label
                        style={{ fontSize: '18px' }}
                        className="help-related-link"
                        onClick={() => {
                          this.handleSelectedHelp(this.state.helpInformation.ParentID);
                        }}
                        title={'Navigate to parent help (' + this.state.helpInformation.ParentID + ')'}
                      >
                        {this.state.helpInformation.ParentTitle}
                      </label>
                    )}
                  </div>
                ) : (
                    <div className="help-footer-wrapper">
                      <div className="help-parent">
                        <label style={{ fontSize: '18px', fontWeight: 'bold' }}>Parent:&nbsp;</label>
                        <Select
                          className={'help-parent-input-select'}
                          id=""
                          value={this.state.parent}
                          onChange={(e) => {
                            this.setState({
                              helpParentId: e ? e.HelpID : null,
                              parent: e,
                            });
                          }}
                          options={this.state.parentOptions}
                        />
                      </div>

                    </div>
                  )}
              </div> */}
            </div>
          ) : null
        ) : (
          <div className="help-body">
            <div className="help-section">
              <div className="help-title">
                <label className="label">Help Identifier</label>
              </div>
              <div className="help-description">
                <input
                  className={showRequired(checkRequired, this.state, 'helpId') ? 'search-account req' : 'search-account'}
                  value={this.state.helpId}
                  onChange={(e) => {
                    this.setState({ helpId: e.target.value });
                  }}
                />
              </div>
            </div>
            <div className="help-section">
              <div className="help-title">
                <label className="label">Title</label>
              </div>
              <div className="help-description">
                <input
                  className={showRequired(checkRequired, this.state, 'helpTitle') ? 'search-account req' : 'search-account'}
                  value={this.state.helpTitle}
                  onChange={(e) => {
                    this.setState({ helpTitle: e.target.value });
                  }}
                />
              </div>
            </div>
            <div className="help-section">
              <div className="help-title">
                <label className="label">Description</label>
              </div>
              <div className="help-description">
                <textarea
                  style={{ width: '100%', height: '150px' }}
                  className={showRequired(checkRequired, this.state, 'helpText') ? 'search-account req' : 'search-account'}
                  value={this.state.helpText}
                  onChange={(e) => {
                    this.setState({ helpText: e.target.value });
                  }}
                />
              </div>
            </div>
            <div className="help-section">
              <div className="help-title">
                <label className="label">Tags</label>
              </div>
              <div className="help-description">
                <textarea
                  className="search-account"
                  style={{ width: '100%', height: '75px' }}
                  value={this.state.helpTags}
                  onChange={(e) => {
                    this.setState({ helpTags: e.target.value });
                  }}
                />
              </div>
            </div>
            {/* <div className="help-section">
                <div className="help-title">
                  <label className="label">Parent</label>
                </div>
                <div className="select-up">
                  <Select
                    className={'help-parent-input-select'}
                    id=""
                    value={this.state.parent}
                    onChange={(e) => {
                      this.setState({
                        helpParentId: e ? e.HelpID : null,
                        parent: e,
                      });
                    }}
                    options={this.state.parentOptions}
                  />
                </div>
              </div> */}
          </div>
        )}
      </div>
    ) : null;
  }
}

export default withRouter(Help);
