import React, { Component } from 'react';
import { resizableGrid, replaceLiquidPolicyValues } from '../Utils/HelperFunctions';
let LiquidFunc = require('../Utils/liquidjs');
//Liquid = require("liquidjs")
var pretty = require('pretty');
var engine = new LiquidFunc();

export default class Liquid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fail: false,
      //uniqueKey: Math.random() * (100 - 1),
    };
    this.renderView = this.renderView.bind(this);
  }

  componentDidMount() {
    let { user } = this.props;
    this.props.setPrintDiv(this.props.layoutViewId + this.state.uniqueKey);
    if (!this.props.preRenderedHTML) {
      var script = this.props.viewScript;
      if (user && script) {
        if (script.indexOf('{Policy.') !== -1) {
          script = replaceLiquidPolicyValues(script, '{Policy.', user.firmPolicies);
        }
      }

      if (!script) {
        for (var i in this.props.liquidTemplates) {
          let template = this.props.liquidTemplates[i];

          if (template.matchValue === this.props.renderertype) {
            script = template.template;
          }
        }
      }

      for (var h = 0; h < this.props.context.length; h++) {
        var replaceString = '{' + this.props.context[h].Parameter + '}';
        var regexExpression = new RegExp(replaceString, 'g');
        let value = this.props.context[h].Value;
        // Issues with comma in name were causing context to break.  We convert all commas to %COMMA% and change them back to a comma below
        if (value.indexOf('%COMMA%') !== -1) {
          const searchRegExp = /%COMMA%/gi;
          const replaceWith = ',';
          value = this.props.context[h].Value.replace(searchRegExp, replaceWith);
        }
        script = script.replace(regexExpression, value);
      }

      const s = document.createElement('script');
      s.id = 'script' + this.props.layoutViewId + this.state.uniqueKey;
      s.type = 'text/template';
      s.async = true;

      s.innerHTML = script;

      const sa = document.createElement('script');
      sa.id = 'scripts';
      sa.type = 'text/javascript';
      sa.async = true;

      sa.innerHTML = `
                        function getURL(d){
                            var base = atob(toAscii(d))     
                            var array = new Uint8Array(base.length);
                            for(var i = 0; i < base.length; i++) {
                            array[i] = base.charCodeAt(i);
                            }       
                            var input = array.buffer
                            var blob = new Blob([input], { type: "application/pdf" });
                            document.getElementById('myIframe').src = window.URL.createObjectURL(blob);
                            document.getElementById('viewButton').style.display = "none";
                        }

                        function toAscii(str) {
                          return str.replace(/[^\\x00-\\x7F]/g, "");
                        }

                        function UniversalRoute(name,target,context){
                                let pathname = '/' + name.replace(/\ /g,'')

                                UniversalLinker(null, pathname, null, null, null, false, context, target, null, null)
                        }

                        function UniversalContext(name,target,context){
                            if(!target || target === 'new' || target === 'popup'){
                                let pathname = window.location.pathname;
                                let query = 'universalcontext='+name;

                                if(context) {
                                    context=context+',target=' + target
                                } else {
                                        context = 'target=' + target
                                }

                                UniversalLinker(null, pathname, query, null, null, false, context, target, null, null)
                            }
                            else{
                                document.getElementById(target).contentWindow.postMessage('UniversalContext,'+name+',,'+context+',target=&disableHeader=true&linkerInstance=true', window.location.origin)
                            }
                        }
                        
                        function UniversalDocument(name,target,context){
                            if(!target || target === 'new' || target === 'popup'){
                                let pathname = window.location.pathname;
                                let query = 'document='+name;

                                if(context) {
                                    context=context+',target=' + target
                                } else {
                                        context = 'target=' + target
                                }

                                UniversalLinker(null, pathname, query, null, null, false, context, target, null, null)
                            }
                            else{
                                document.getElementById(target).contentWindow.postMessage('UniversalDocument,'+name+',,'+context+',target=&disableHeader=true&linkerInstance=true', window.location.origin)
                            }
                        }

                        function UniversalView(name,target,context){
                            if(!target || target === 'new' || target === 'popup'){
                                let pathname = window.location.pathname;
                                let query = 'view='+name;

                                if(context) {
                                    context=context+',target=' + target
                                } else {
                                        context = 'target=' + target
                                }

                                UniversalLinker(null, pathname, query, null, null, false, context, target, null, null)
                            }
                            else{
                                document.getElementById(target).contentWindow.postMessage('UniversalView,'+name+',,'+context+',target=&disableHeader=true&linkerInstance=true', window.location.origin)
                            }
                        }

                        function UniversalChart(name,target,context){
                            if(!target || target === 'new' || target === 'popup'){
                                let pathname = window.location.pathname;
                                let query = 'chart='+name;

                                if(context) {
                                    context=context+',target=' + target
                                } else {
                                        context = 'target=' + target
                                }

                                UniversalLinker(null, pathname, query, null, null, false, context, target, null, null)
                            }
                            else{
                                document.getElementById(target).contentWindow.postMessage('UniversalChart,'+name+',,'+context+',target=&disableHeader=true&linkerInstance=true', window.location.origin)
                            }
                        }

                        function UniversalHelp(name,target,context,route){
                            if(!target || target === 'new' || target === 'popup'){
                                let pathname = window.location.pathname;
                                let query = 'help='+name;

                                if(context) {
                                    context=context+',target=' + target
                                } else {
                                        context = 'target=' + target
                                }

                                UniversalLinker(null, pathname, query, null, null, false, context, target, null, null)
                            }
                            else{
                                document.getElementById(target).contentWindow.postMessage('UniversalHelp,'+name+',,'+context+',target=&disableHeader=true&linkerInstance=true', window.location.origin)
                            }
                        }

                        function UniversalGrid(name,target,context){
                            if(!target || target === 'new' || target === 'popup'){
                                let pathname = window.location.pathname;
                                let query = 'grid='+name;

                                if(context) {
                                    context=context+',target=' + target
                                } else {
                                        context = 'target=' + target
                                }

                                UniversalLinker(null, pathname, query, null, null, false, context, target, null, null)
                            }
                            else{
                                document.getElementById(target).contentWindow.postMessage('UniversalGrid,'+name+',,'+context+',target=&disableHeader=true&linkerInstance=true', window.location.origin)
                            }
                        }
                        function UniversalPowerGrid(name,target,context){
                          if(!target || target === 'new' || target === 'popup'){
                              let pathname = window.location.pathname;
                              let query = 'powergrid='+name;

                              if(context) {
                                  context=context+',target=' + target
                              } else {
                                      context = 'target=' + target
                              }

                              UniversalLinker(null, pathname, query, null, null, false, context, target, null, null)
                          }
                          else{
                              document.getElementById(target).contentWindow.postMessage('UniversalPowerGrid,'+name+',,'+context+',target=&disableHeader=true&linkerInstance=true', window.location.origin)
                          }
                      }
                        function UniversalTable(name,target,context){
                            if(!target || target === 'new' || target === 'popup'){
                                let pathname = window.location.pathname;
                                let query = 'table='+name;

                                if(context) {
                                    context=context+',target=' + target
                                } else {
                                        context = 'target=' + target
                                }

                                UniversalLinker(null, pathname, query, null, null, false, context, target, null, null)
                            }
                            else{
                                document.getElementById(target).contentWindow.postMessage('UniversalTable,'+name+',,'+context+',target=&disableHeader=true&linkerInstance=true', window.location.origin)
                            }
                        }

                        function UniversalForm(name,target,context){    
                            if(!target || target === 'new' || target === 'popup'){
                                let pathname = window.location.pathname;
                                let query = 'form='+name;

                                if(context) {
                                    context=context+',target=' + target
                                } else {
                                        context = 'target=' + target
                                }

                                UniversalLinker(null, pathname, query, null, null, false, context, target, null, null)
                            }
                            else{
                                document.getElementById(target).contentWindow.postMessage('UniversalForm,'+name+',,'+context+',target=&disableHeader=true&linkerInstance=true', window.location.origin)
                            }
                            
                        }

                        function UniversalApi(endpoint,httpmethod,postbody,target,context,linktype,linkidentifier){
                                if(context) {
                                    context=context+',target=popup'
                                } else {
                                        context = 'target=popup'
                                }

                                UniversalLinker(endpoint, null, null, httpmethod, postbody, true, context, target, linktype, linkidentifier)
                        }
                        function UniversalAddTicket(name,target,context,route, accountid){
                            let pathname = window.location.pathname;
                            let query = 'addticket='+name;
                            query = accountid ? query + '&acctid='+ accountid : query;
                        
                            if(context) {
                                context=context+',target=' + target
                            } else {
                                    context = 'target=' + target
                            }
                        
                            UniversalLinker(null, pathname, query, null, null, false, context, target, null, null, route)
                        }
                        
                        function UniversalViewTicket(name,target, editable){
                            let pathname = window.location.pathname;
                            let query = 'viewticket='+name;
                            query = editable ? query + '&editable='+ editable : query;
                        
                            let context = 'target=' + target
                        
                            UniversalLinker(null, pathname, query, null, null, false, context, target, null, null, null)
                        }

                        function UniversalDocuments(name, target, editable) {
                            let pathname = window.location.pathname;
                            let query = "documents=" + name;
                            query = editable ? query + "&editable=" + editable : query;

                            let context = "target=" + target;

                            return UniversalLinker(null, pathname, query, null, null, false, context, target, null, null, null);
                        }

                        function UniversalLinker(environment, pathname, search, method, body, api, context, target, linktype, linkidentifier){
                            if(!target || target === 'new' || target === 'popup')
                            {   
                                if(!api){
                                        if(search){
                                                pathname = pathname + '?' + encodeURIComponent(search)
                                        }
                                        if(context){
                                                if(search){
                                                        pathname = pathname+'&context='+encodeURIComponent(context)
                                                }
                                                else{
                                                        pathname = pathname+'?context='+encodeURIComponent(context)
                                                }
                                        }

                                        if(target === 'new'){
                                                window.open(pathname)
                                        }
                                        else{
                                                window.history.pushState({liquid: true}, '', pathname); 
                                                window.history.pushState('', '', window.location.pathname); 
                                                window.history.forward()
                                                window.history.back()
                                        }
                                }
                                else{
                                        window.history.pushState({liquid: true}, '', '?api='+encodeURIComponent(environment)+','+method+','+encodeURIComponent(body)+','+linktype+','+linkidentifier+','+target+'&context='+encodeURIComponent(context))
                                        window.history.pushState('', '', window.location.pathname)
                                        window.history.forward()
                                        window.history.back()
                                }
                            }
                            else{
                                document.getElementById(target).contentWindow.postMessage(context.split(',')[0], window.location.origin)
                            }
                        }`;

      this.instance.appendChild(s);
      this.instance.appendChild(sa);
      this.renderView();
    } else {
      this.renderViewPreRendered();
    }
  }

  componentDidUpdate(nextProps, nextState) {
    if (!nextProps.printDivId) {
      this.props.setPrintDiv(this.props.layoutViewId + this.state.uniqueKey);
    }
  }

  renderViewPreRendered() {
    this.DOMscripts();
  }
  renderView() {
    let cleanJSON = {};
    try {
      cleanJSON = JSON.parse(this.props.getCleanJSON());
    } catch (e) {
      this.setState({
        fail: true,
      });
      return;
    }

    if (this.props.liquidFunctions) {
      for (var i = 0; i < this.props.liquidFunctions.length; i++) {
        engine.registerFilter(this.props.liquidFunctions[i].Name, eval(this.props.liquidFunctions[i].Function));
      }
    }

    this.DOMscripts();
    return engine
      .parseAndRender(document.getElementById('script' + this.props.layoutViewId + this.state.uniqueKey).innerHTML, cleanJSON)
      .then((html) => (document.getElementById(this.props.layoutViewId + this.state.uniqueKey).innerHTML = html ? html.replace(/>\s+</g, '><') : html))
      .catch((e) => (document.getElementById(this.props.layoutViewId + this.state.uniqueKey).innerHTML = pretty(this.escapeHTML(e.stack))));
  }

  DOMscripts() {
    var $ = require('jquery');
    var dt = require('datatables.net');

    $(document).ready(function () {
      // Prevent liquid tables from being draggable in layout
      $(function () {
        $('table tr').addClass('no-drag');
      });
      for (var i = 0; i < document.getElementsByClassName('data-table-active').length; i++) {
        var tmp = document.getElementsByClassName('data-table-active')[i];
        if (!($.fn.DataTable.fnIsDataTable(tmp) || $(tmp).hasClass('dataTable'))) {
          $(tmp).DataTable({
            bInfo: true,
            bJQueryUI: true,
            bProcessing: true,
            bPaginate: true,
            aLengthMenu: [
              [10, 25, 50, 100, 150, 200, 250, 300, -1],
              [10, 25, 50, 100, 150, 200, 250, 300, 'All'],
            ],
            iDisplayLength: 25,
            sPaginationType: 'simple_numbers',
            sDom: '<"#datatable-xwrapper"<"datatable-xfilter"f><"datatable-xpaging"p><"datatable-xlength"l>>r' + 't<"bottom"i><"clear">',
            deferRender: true,
            bDestroy: true,
            language: {
              paginate: {
                next: '<i class="fa fa-fw fa-caret-right">',
                previous: '<i class="fa fa-fw fa-caret-left">',
              },
              sLengthMenu: 'Show _MENU_',
            },
            fixedHeader: {
              header: true,
              footer: true,
            },
          });
        }
      }
      $(function () {
        var table = document.getElementsByClassName('columns-resizable');
        for (var x = 0; x < table.length; x++) {
          var tmp = table[x];
          // resizableGrid(tmp);
        }
      });
    });
  }

  escapeHTML(str) {
    return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  render() {
    return (
      <div className={'view-table-container'}>
        {this.state.fail ? (
          <div className="empty-view">No Data</div>
        ) : this.props.preRenderedHTML ? (
          <div>
            <div id={this.props.layoutViewId + this.state.uniqueKey} dangerouslySetInnerHTML={{ __html: this.props.preRenderedHTML }}></div>
          </div>
        ) : (
          <div>
            <div ref={(el) => (this.instance = el)} />
            <div id={this.props.layoutViewId + this.state.uniqueKey}></div>
          </div>
        )}
      </div>
    );
  }
}
