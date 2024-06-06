import * as globals from '../../../Globals/Variables';
const xslt = require('xslt');
const xml2js = require('xml2js');

export function updateViewXMLValue(obj, xml) {
  let viewXML = xml;
  Object.keys(obj).map((entry) => {
    let updateObj = {
      matchValue: buildMatchValue(obj[entry]),
      value: buildElement(obj[entry]),
      type: obj[entry].matchValue,
      transformType: obj[entry].transformType,
    };
    let transform = buildTransform(updateObj);
    if (viewXML === null) {
      viewXML = globals.DEFAULT_VIEW;
    }

    viewXML = staticTransform({ viewXML, transform });
  });

  return viewXML;
}

function buildMatchValue(obj) {
  switch (obj.matchValue) {
    case 'odataurl':
      return 'odataurl';
    case 'method':
      return 'method';
    case 'template':
      return 'catalog/template';
    case 'resolvedtemplate':
      return 'resolvedtemplate';
    case 'parameters':
      return 'parameters';
    case 'baseurl':
      return 'baseurl';
    case 'dimensions':
      return 'dimensions';
    case 'filtering':
      return 'filtering';
    case 'sorting':
      return 'sorting';
    case 'visibility':
      return `column[@id = '${obj.columnName}']/visibility`;
    case 'grouping':
      return `column[@id = '${obj.columnName}']/group`;

    case 'resetallgrouping':
      return `column[@id != '${obj.columnName}']/group`;

    case 'resetgrouping':
      return `column[@id = '${obj.columnName}']/group`;

    case 'dateformat':
      return `column[@id = '${obj.columnName}']/dateformat`;

    case 'numberformat':
      return `column[@id = '${obj.columnName}']/numberformat`;

    case 'pivot':
      return `column[@id = '${obj.columnName}']/pivot`;

    case 'resetallpivot':
      return `column[@id != '${obj.columnName}']/pivot`;

    case 'resetpivot':
      return `column[@id = '${obj.columnName}']/pivot`;

    case 'analysis':
      return `column[@id = '${obj.columnName}']/analysis`;
    case 'analysisfunction':
      return `column[@id = '${obj.columnName}']/analysisfunction`;
    case 'resetallanalysis':
      return `column[@id != '${obj.columnName}']/analysis`;
    case 'resetanalysis':
      return `column[@id = '${obj.columnName}']/analysis`;
    case 'type':
      return 'type';
    case 'renderertype':
      return 'renderertype';
    case 'chartlimiter':
      return 'chartlimiter';
    case 'liquidoption':
      return 'liquidoption';
    case 'prototype':
      return 'chart/prototype';
    case 'categoryselected':
      return 'categoryselected';
    case 'seriesselected':
      return 'seriesselected';
    case 'axes':
      return 'axes';
    case 'caption':
      return `column[@id = '${obj.columnName}']/caption`;
    case 'visible':
      return `column[@id = '${obj.columnName}']/visibility`;
    case 'position':
      return `column[@id = '${obj.columnName}']/position`;
    case 'dataType':
      return `column[@id = '${obj.columnName}']/datatype`;
    case 'drilldown':
      return 'drilldown';
    case 'connection':
      return 'connection';
    case 'viewtitle':
      return 'viewtitle';
    case 'description':
      return 'description';
    case 'defaultView':
      return 'defaultView';
    case 'url':
      return 'url';
    case 'urlcaption':
      return 'urlcaption';
    case 'category':
      return 'category';
    case 'applyodata':
      return 'applyodata';
    case 'exportable':
      return 'exportable';
    case 'size':
      return 'size';
    case 'rowlimiter':
      return 'rowlimiter';
    case 'total':
      return 'total';
    case 'legendposition':
      return 'legendposition';
    case 'datatype':
      return `column[@id = '${obj.columnName}']/datatype`;
    default:
      return null;
  }
}

function buildElement(obj) {
  switch (obj.matchValue) {
    case 'filtering':
      if (Object.keys(obj.filters).length > 0) {
        // NOTE: need to build <filter /> tags for filters from EVERY column
        let filters = Object.keys(obj.filters).map((key, idx) => {
          return Object.keys(obj.filters[key]).map((filterKey) => {
            let filterPointer = obj.filters[key];
            let individualFilter = `
						<filter>
							<column>${key}</column>
							<criteria>${filterPointer[filterKey].criteria}</criteria>
							<value>${filterPointer[filterKey].value}</value>
							${filterPointer[filterKey].logic === 'none' ? `<logic />` : `<logic>${filterPointer[filterKey].logic}</logic>`}
						</filter>
						`;
            return individualFilter;
          });
        });
        let filterString = `<filters>${filters}</filters>`;
        return filterString.replace(/,/g, '');
      } else {
        return `<filter>
									<column></column>
									<criteria></criteria>
									<value></value>
								</filter>`;
      }
    case 'sorting':
      let criteriaString = obj.sort ? obj.sort : null;
      return `<sort>
								<column>${obj.columnName}</column>
								<criteria>${criteriaString}</criteria>
							</sort>`;
    case 'visibility':
      return `<visibility>${obj.value}</visibility>`;
    case 'odataurl':
      return `<odataurl>${obj.value}</odataurl>`;
    case 'baseurl':
      return `<baseurl>${obj.value}</baseurl>`;
    case 'grouping':
      return `<group>1</group>`;
    case 'resetallgrouping':
      return `<group>0</group>`;
    case 'resetgrouping':
      return `<group>0</group>`;
    case 'pivot':
      return `<pivot>1</pivot>`;
    case 'resetallpivot':
      return `<pivot>0</pivot>`;
    case 'resetpivot':
      return `<pivot>0</pivot>`;
    case 'analysis':
      return `<analysis>1</analysis>`;
    case 'resetanalysis':
      return `<analysis>0</analysis>`;
    case 'resetallanalysis':
      return `<analysis>0</analysis>`;
    case 'renderertype':
      return `<renderertype>${obj.value}</renderertype>`;
    case 'chartlimiter':
      return `<chartlimiter>${obj.value}</chartlimiter>`;
    case 'liquidoption':
      return `<liquidoption>${obj.value}</liquidoption>`;
    case 'type':
      if (obj.charttype === 'barstacked') {
        return `<xsl:element name="type"><xsl:attribute name="stacked">true</xsl:attribute>bar</xsl:element>`;
      } else if (obj.charttype === 'columnstacked') {
        return `<xsl:element name="type"><xsl:attribute name="stacked">true</xsl:attribute>column</xsl:element>`;
      } else if (obj.charttype === 'areastacked') {
        return `<xsl:element name="type"><xsl:attribute name="stacked">true</xsl:attribute>area</xsl:element>`;
      } else if (obj.charttype === 'linestacked') {
        return `<xsl:element name="type"><xsl:attribute name="stacked">true</xsl:attribute>line</xsl:element>`;
      } else if (obj.charttype === 'barstacked100') {
        return `<xsl:element name="type"><xsl:attribute name="stacked">percent</xsl:attribute>bar</xsl:element>`;
      } else if (obj.charttype === 'columnstacked100') {
        return `<xsl:element name="type"><xsl:attribute name="stacked">percent</xsl:attribute>column</xsl:element>`;
      } else if (obj.charttype === 'areastacked100') {
        return `<xsl:element name="type"><xsl:attribute name="stacked">percent</xsl:attribute>area</xsl:element>`;
      } else if (obj.charttype === 'linestacked100') {
        return `<xsl:element name="type"><xsl:attribute name="stacked">percent</xsl:attribute>line</xsl:element>`;
      } else if (obj.charttype.includes('custom')) {
        return `<xsl:element name="type"><xsl:attribute name="stacked">custom</xsl:attribute>${obj.charttype.split('?')[1]}</xsl:element>`;
      } else {
        return `<xsl:element name="type"><xsl:attribute name="stacked">false</xsl:attribute>${obj.charttype}</xsl:element>`;
      }
    case 'prototype':
      return null; //`${this.state.highcharts}`
    case 'method':
      return `<method>${obj.value}</method>`;
    case 'template':
      return `<template>${obj.value}</template>`;
    case 'resolvedtemplate':
      return `<resolvedtemplate>${obj.value}</resolvedtemplate>`;
    case 'parameters':
      return `<parameters>${obj.value}</parameters>`;
    case 'categoryselected':
      return `<categoryselected id="${obj.value}">${obj.value}</categoryselected>`;
    case 'seriesselected':
      return Object.keys(obj.series).map((index) => {
        return `<serie id="${obj.series[index].analyzedColumn}" axis="${obj.series[index].axis}" charttype="${obj.series[index].charttype}"/>`;
      });
    case 'axes':
      if (Object.keys(obj.axes).length === 0) {
        return `<axes><axe id="0"/></axes>`;
      } else {
        let axes = Object.keys(obj.axes).map((key, idx) => {
          return `<axe id="${idx}"><title>${obj.axes[key].axisLabel}</title><label></label></axe>`;
        });
        return `<axes>${axes}</axes>`.replace(/,/g, '');
      }
    case 'drilldown':
      if (obj.value === 'none') {
        return `<drilldown></drilldown>`;
      } else {
        return `<drilldown><column>${obj.value}</column></drilldown>`;
      }
    case 'caption':
      return `<caption>${obj.value}</caption>`;
    case 'connection':
      return `<connection>${obj.value}</connection>`;
    case 'position':
      return `<position>${obj.value}</position>`;
    case 'visible':
      return `<visibility>${obj.value}</visibility>`;
    case 'dataType':
      return `<datatype>${obj.value}</datatype>`;
    case 'dimensions':
      return Object.keys(obj.value).map((key, idx) => {
        if (obj.value[key] != 'none') {
          return `<dimension>${obj.value[key]}</dimension>`;
        } else {
          return {};
        }
      });
    case 'viewtitle':
      //this.setState({viewName: obj.value})
      return `<viewtitle>${obj.value}</viewtitle>`;
    case 'description':
      return `<description>${obj.value}</description>`;
    case 'defaultView':
      return `<defaultView>${obj.value}</defaultView>`;
    case 'url':
      return `<url>${obj.value}</url>`;
    case 'urlcaption':
      return `<urlcaption>${obj.value}</urlcaption>`;
    case 'category':
      return `<category>${obj.value}</category>`;
    case 'applyodata':
      return `<applyodata>${obj.value}</applyodata>`;
    case 'exportable':
      return `<exportable>${obj.value}</exportable>`;
    case 'size':
      return `<size>${obj.value}</size>`;
    case 'rowlimiter':
      return `<rowlimiter>${obj.value}</rowlimiter>`;
    case 'analysisfunction':
      return `<analysisfunction>${obj.value}</analysisfunction>`;
    case 'dateformat':
      return `<dateformat>${obj.value}</dateformat>`;
    case 'numberformat':
      return `<numberformat>${obj.value}</numberformat>`;
    case 'datatype':
      return `<datatype>${obj.value}</datatype>`;
    case 'total':
      return `<total>${obj.value}</total>`;
    case 'legendposition':
      return `<legendposition>${obj.value}</legendposition>`;
    default:
      return;
  }
}

export function buildTransform(updateObj) {
  if (updateObj.transformType === 'replaceElement') {
    return `<?xml version="1.0" encoding="utf-8"?>
								<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
										<xsl:output method="xml" version="1.0" encoding="UTF-8" indent="yes" omit-xml-declaration="yes"/>
								 <xsl:template match="@* | node()">
												<xsl:copy>
														<xsl:apply-templates select="@* | node()"/>
												</xsl:copy>
										</xsl:template>
								 <xsl:template match="//${updateObj.matchValue}">
												${updateObj.value}
									</xsl:template>
								</xsl:stylesheet>`;
  } else {
    return `<?xml version="1.0" encoding="utf-8"?>
							<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
							<xsl:output method="xml" version="1.0" encoding="UTF-8" indent="yes" omit-xml-declaration="yes"/>
							<xsl:template match="@* | node()">
								<xsl:copy>
									<xsl:apply-templates select="@* | node()"/>
								</xsl:copy>
							</xsl:template>
							<xsl:template match="//${updateObj.matchValue}">
							<xsl:copy>
								<xsl:apply-templates select="@*"/>
								${updateObj.value}
							</xsl:copy>
						</xsl:template>
					</xsl:stylesheet>`;
  }
}

export function staticTransform({ viewXML, transform, id }) {
  return xslt(viewXML, transform);
}

export function extractDataFromXML({ firstKey, secondKey, xml }) {
  let extractedData = '';
  const parser = new xml2js.Parser();
  if(xml){
    parser.parseString(xml, (err, result) => {
      extractedData = result[firstKey][secondKey];
    });
  }
  return extractedData;
}

export function extractDataFromXMLSingleKey({ firstKey, xml }) {
  if (xml) {
    let extractedData = '';
    const parser = new xml2js.Parser();
    parser.parseString(xml, (err, result) => {
      extractedData = result[firstKey];
    });
    return extractedData;
  } else {
    return null;
  }
}
