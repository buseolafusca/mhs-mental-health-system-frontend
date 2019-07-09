import axios from "axios";
import { baseUrl, fetchQuestionnairesUrl, patientanswersUrl, backendURL } from "../variables/general";

const postNewSurvey = async (createSurveyUrl, surveyData) => {
  try {
    const response = await axios({
      method: 'post',
      url: createSurveyUrl,
      data: surveyData
    })
    return response
  } catch (error) {
    console.log('POST server error: ', error)
  }
  console.log(createSurveyUrl)
  console.log(surveyData)

  axios.post(createSurveyUrl, surveyData)
    .then(function (response) {
      console.log('response')
      console.log(response)
    })
    .catch(function (error) {
      console.log(error)
    })
}

const updateSurvey = async (updateSurveyUrl, surveyData) => {
  try {
    const response = await axios({
      method: 'put',
      url: updateSurveyUrl,
      data: surveyData
    })
    return response
  } catch (error) {
    console.log('PUT server error: ', error)
  }
  // console.log(updateSurveyUrl)
  // console.log(surveyData)

    axios.put(updateSurveyUrl, surveyData)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
}
const fetchQuestionnaires = async () => {
    return await axios.get(baseUrl + fetchQuestionnairesUrl)
    .then(function(response){
      const data = response.data.data
      const idPublishedList = []
      const questionnairePublishedList = []
      const idDraftList = []
      const questionnaireDraftList = []

      data.forEach(element => {
        if (element.status === 'PUBLISHED') {
          questionnairePublishedList.push([element.title, element.description, element.status])
          idPublishedList.push(element._id)
        } else if (element.status === 'DRAFT') {
          questionnaireDraftList.push([element.title, element.description, element.status])
          idDraftList.push(element._id)
        }
        else if(element.status === 'DRAFT'){
          questionnaireDraftList.push([element.title, element.description, element.status]);
          idDraftList.push(element._id);
        }
        
      });
      return {'idDraftList': idDraftList, 
              'idPublishedList': idPublishedList, 
              'questionnaireDraftList': questionnaireDraftList, 
              'questionnairePublishedList': questionnairePublishedList
             };
    })
}

const fetchUserAnswers = async () => {
  console.log("fetchUserAnswers");
  var userAnswerUrl = baseUrl + patientanswersUrl;
  try {
    const response = await axios.get(userAnswerUrl)
    // return response;
    console.log("response");
    console.log(response);
    return response.data.data;
  } catch (error) {
    console.log('GET server error: ', error)
  }
}

const fetchWeeklyResult = async (startDate, lastDate) => {
  console.log('fetchWeeklyCount')
  var weeklyResultUrl = 'http://mhsbackend.azurewebsites.net/api/v1/patientanswers/'
  console.log(startDate)
  console.log(lastDate)
  try {
    const response = await axios.get(weeklyResultUrl, {
      params: {
        startDate: lastDate,
        endDate: startDate,
        groupby: 'date'
      }
    })

    return response.data.data
  } catch (error) {
    console.log('GET server error: ', error)
  }
}

const getAnsweredQuestionnaire= async(theId) => {
  return await axios.get(baseUrl + patientanswersUrl + '/' +theId)
  .then(function(response){
    return response.data.data;
  })

}

const fetchQuestionnaire = async (questionnaireId) => {
  return await axios.get(baseUrl + fetchQuestionnairesUrl + "/" + questionnaireId)
  .then(function(response){

    const data = response.data.data;
    return {'id': data._id, 'body': data.body};
  })
  .catch(function (error){
    console.log(error);
  });
}

const deleteQuestionnaire = async (questionnaireId) => {
  return await axios({
    method: 'delete',
    url: baseUrl + fetchQuestionnairesUrl + '/' + questionnaireId
  }).then(function(response){
    console.log(response);
  })
    .catch(function (error) {
      console.log(error)
    })
}

const getQuestionnaire = async (qustionId) => {
  try {
    const response = await axios.get(baseUrl + fetchQuestionnairesUrl + '/' + qustionId);
    return response.data.data;
  } catch (error) {
    console.log('GET server error: ', error)
  }
}

export { postNewSurvey, updateSurvey,fetchQuestionnaires, fetchWeeklyResult, fetchUserAnswers, getQuestionnaire, getAnsweredQuestionnaire, fetchQuestionnaire, deleteQuestionnaire }
