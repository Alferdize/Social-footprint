import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Popper from "popper.js";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  @ViewChild('textRef', { static: false })
  textRef: ElementRef;
  popper = document.createElement("div");
  textArea: String
  checkAnatomy: Boolean
  checkDiseases: Boolean
  checkDrugs: Boolean
  checkNegative_drugs_diseases: Boolean
  checkDosage: Boolean
  showToogle: Boolean
  loader: Boolean
  sampleImages: Array<Object>
  error: Boolean
  submitData: Boolean
  Anatomy: Array<Object>
  Diseases: Array<Object>
  Negative_drugs_diseases: Array<Object>
  Dosage: Array<Object>
  Drugs: Array<Object>
  result: Array<Object>
  index = 0

  constructor(private httpClient: HttpClient
  ) {
  }

  ngOnInit(): void {
    this.index = 0
    this.loader = false
    this.Anatomy = []
    this.Diseases = []
    this.Dosage = []
    this.Drugs = []
    this.Negative_drugs_diseases = []
    this.result = [{ "Anatomy": [], "Diseases": [{ "term": "CHF", "span": [[47, 50]] }, { "term": "COPD", "span": [[52, 56]] }, { "term": "lethargy", "span": [[168, 176]] }, { "term": "COPD flares", "span": [[85, 96]] }, { "term": "chest pain", "span": [[38, 48]] }, { "term": "fevers", "span": [[50, 56]] }, { "term": "chills", "span": [[58, 64]] }, { "term": "diarrhea", "span": [[91, 99]] }, { "term": "neck pain", "span": [[115, 124]] }, { "term": "ED", "span": [[7, 9]] }, { "term": "NRB", "span": [[41, 44]] }, { "term": "NRB", "span": [[137, 140]] }, { "term": "hypotension", "span": [[48, 59]] }, { "term": "VS", "span": [[21, 23]] }], "Dosage": [{ "term": "5 L", "span": [[60, 63]] }, { "term": "nebulizer", "span": [[16, 25]] }, { "term": "nebs", "span": [[27, 31]] }, { "term": "125 mg", "span": [[44, 50]] }, { "term": "x1", "span": [[54, 56], [76, 78]] }, { "term": "325 mg", "span": [[66, 72]] }, { "term": "x1", "span": [[54, 56], [76, 78]] }, { "term": "2 g", "span": [[11, 14]] }, { "term": "x1", "span": [[18, 20], [44, 46], [70, 72], [95, 97]] }, { "term": "400 mg", "span": [[35, 41]] }, { "term": "IVx1", "span": [[42, 46], [68, 72], [93, 97]] }, { "term": "750 mg", "span": [[61, 67]] }, { "term": "IVx1", "span": [[42, 46], [68, 72], [93, 97]] }, { "term": "1g", "span": [[90, 92]] }, { "term": "IVx1", "span": [[42, 46], [68, 72], [93, 97]] }, { "term": "2L", "span": [[9, 11]] }], "Drugs": [{ "term": "oxygen", "span": [[64, 70]] }, { "term": "oxygen", "span": [[64, 70]] }, { "term": "levaquin", "span": [[50, 58]] }, { "term": "levaquin", "span": [[50, 58]] }, { "term": "NRB", "span": [[41, 44]] }, { "term": "lactate", "span": [[56, 63]] }, { "term": "solumedrol", "span": [[33, 43]] }, { "term": "aspirin", "span": [[58, 65]] }, { "term": "combivent", "span": [[17, 26]] }, { "term": "solumedrol", "span": [[33, 43]] }, { "term": "aspirin", "span": [[58, 65]] }, { "term": "Mg sulfate 2 g", "span": [[0, 14]] }, { "term": "azithromycin", "span": [[22, 34]] }, { "term": "levofloxacin", "span": [[48, 60]] }, { "term": "Cefrtiaxone", "span": [[78, 89]] }, { "term": "Mg sulfate", "span": [[0, 10]] }, { "term": "azithromycin", "span": [[22, 34]] }, { "term": "levofloxacin", "span": [[48, 60]] }, { "term": "Cefrtiaxone", "span": [[78, 89]] }, { "term": "NRB", "span": [[137, 140]] }, { "term": "Propafol", "span": [[0, 8]] }, { "term": "Propafol", "span": [[0, 8]] }, { "term": "fentanyl", "span": [[25, 33]] }, { "term": "midazolam", "span": [[34, 43]] }, { "term": "NS", "span": [[15, 17]] }], "Negative_drugs_diseases": [{ "term": "neck pain", "span": [[115, 124]] }, { "term": "chills", "span": [[58, 64]] }, { "term": "diarrhea", "span": [[91, 99]] }, { "term": "chest pain", "span": [[38, 48]] }, { "term": "fevers", "span": [[50, 56]] }] },
    { "Anatomy": [{ "term": "respiratory", "span": [[4, 15]] }, { "term": "airways", "span": [[38, 45]] }, { "term": "trachea", "span": [[102, 109]] }, { "term": "pulmonary", "span": [[21, 30]] }, { "term": "granulation tissue", "span": [[13, 31]] }, { "term": "distal right lateral wall", "span": [[39, 64]] }, { "term": "tracheal", "span": [[72, 80]] }, { "term": "airways", "span": [[61, 68], [99, 106]] }, { "term": "airways", "span": [[61, 68], [99, 106]] }, { "term": "vocal cords", "span": [[37, 48]] }, { "term": "respiratory", "span": [[35, 46]] }, { "term": "tracheobronchial", "span": [[23, 39]] }, { "term": "Tracheal", "span": [[0, 8]] }], "Diseases": [{ "term": "COPD", "span": [[68, 72]] }, { "term": "respiratory failure", "span": [[4, 23]] }, { "term": "COPD", "span": [[33, 37]] }, { "term": "hypoxemia", "span": [[18, 27]] }, { "term": "chest pain", "span": [[51, 61]] }, { "term": "MI", "span": [[83, 85]] }], "Dosage": [], "Drugs": [{ "term": "nitroglycerin", "span": [[100, 113]] }, { "term": "nitroglycerin", "span": [[100, 113]] }, { "term": "oxygen", "span": [[30, 36]] }, { "term": "oxygen", "span": [[30, 36]] }], "Negative_drugs_diseases": [{ "term": "MI", "span": [[83, 85]] }] },
    { "Anatomy": [{ "term": "neurologic", "span": [[145, 155]] }], "Diseases": [{ "term": "emphysema", "span": [[76, 85]] }, { "term": "COPD", "span": [[199, 203]] }, { "term": "CPAP", "span": [[50, 54]] }, { "term": "nausea", "span": [[66, 72]] }, { "term": "vomiting", "span": [[74, 82]] }, { "term": "gastrointestinal complaints", "span": [[116, 143]] }, { "term": "neurologic changes, rashes", "span": [[145, 171]] }], "Dosage": [{ "term": "taper", "span": [[61, 66]] }, { "term": "125 mg", "span": [[86, 92]] }, { "term": "x2", "span": [[96, 98]] }], "Drugs": [{ "term": "O2", "span": [[99, 101]] }, { "term": "O2", "span": [[99, 101]] }, { "term": "prednisone", "span": [[50, 60]] }, { "term": "prednisone", "span": [[50, 60]] }, { "term": "oxygen", "span": [[40, 46], [76, 82]] }, { "term": "oxygen", "span": [[40, 46], [76, 82]] }, { "term": "oxygen", "span": [[40, 46], [76, 82]] }, { "term": "levofloxacin", "span": [[21, 33]] }, { "term": "levofloxacin", "span": [[21, 33]] }, { "term": "nebulizers", "span": [[38, 48]] }, { "term": "oxygen", "span": [[20, 26]] }, { "term": "Solu-Medrol", "span": [[74, 85]] }, { "term": "Solu-Medrol", "span": [[74, 85]] }], "Negative_drugs_diseases": [{ "term": "O2", "span": [[99, 101]] }, { "term": "COPD", "span": [[199, 203]] }, { "term": "Solu-Medrol", "span": [[74, 85]] }, { "term": "gastrointestinal complaints", "span": [[116, 143]] }, { "term": "neurologic changes, rashes", "span": [[145, 171]] }, { "term": "vomiting", "span": [[74, 82]] }, { "term": "nausea", "span": [[66, 72]] }] },
    { "Anatomy": [{ "term": "neurological", "span": [[4, 16]] }, { "term": "tube", "span": [[44, 48]] }, { "term": "eyes", "span": [[22, 26]] }, { "term": "cardiac", "span": [[9, 16]] }, { "term": "heart", "span": [[54, 59]] }, { "term": "Cardiac", "span": [[0, 7]] }], "Diseases": [{ "term": "sphenoid meningioma", "span": [[77, 96]] }, { "term": "sphenoid meningioma", "span": [[42, 61]] }, { "term": "headache", "span": [[18, 26]] }, { "term": "nausea", "span": [[28, 34]] }, { "term": "vomiting", "span": [[36, 44]] }, { "term": "urinary incontinence", "span": [[46, 66]] }, { "term": "cardiac pacemaker placement", "span": [[9, 36]] }, { "term": "bradycardia", "span": [[69, 80]] }, { "term": "sphenoid meningioma", "span": [[61, 80]] }, { "term": "Cardiac arrhythmia", "span": [[0, 18]] }, { "term": "prostate cancer", "span": [[61, 76]] }, { "term": "hypertension", "span": [[101, 113]] }], "Dosage": [], "Drugs": [{ "term": "CA", "span": [[27, 29]] }], "Negative_drugs_diseases": [{ "term": "urinary incontinence", "span": [[46, 66]] }, { "term": "headache", "span": [[18, 26]] }, { "term": "vomiting", "span": [[36, 44]] }, { "term": "nausea", "span": [[28, 34]] }] }]
    this.checkAnatomy = true
    this.checkDiseases = true
    this.checkDrugs = true
    this.checkNegative_drugs_diseases = true
    this.checkDosage = true
    this.submitData = false
    this.error = false
    this.textArea = "History of Present Illness:   87 yo F with h/o CHF, COPD on 5 L oxygen at baseline, tracheobronchomalacia s/p stent, presents with acute dyspnea over several days, and lethargy. This morning patient developed an acute worsening in dyspnea, and called EMS. EMS found patient tachypnic at saturating 90% on 5L. Patient was noted to be tripoding. She was given a nebulizer and brought to the ER. . According the patient's husband, she was experiencing symptoms consistent with prior COPD flares. Apparently patient was without cough, chest pain, fevers, chills, orthopnea, PND, dysuria, diarrhea, confusion and neck pain. Her husband is a physician and gave her a dose of levaquin this morning. . In the ED, patient was saturating 96% on NRB. CXR did not reveal any consolidation. Per report EKG was unremarkable. Laboratory evaluation revealed a leukocytosis if 14 and lactate of 2.2. Patient received combivent nebs, solumedrol 125 mg IV x1, aspirin 325 mg po x1. Mg sulfate 2 g IV x1, azithromycin 400 mg IVx1, levofloxacin 750 mg IVx1, and Cefrtiaxone 1g IVx1. Patient became tachpnic so was trialed on non-invasive ventilation but became hypotensive to systolics of 80, so noninvasive was removed and patient did well on NRB and nebulizers for about 2 hours. At that time patient became agitated, hypoxic to 87% and tachypnic to the 40s, so patient was intubated. Post intubation ABG was 7.3/60/88/31. Propafol was switched to fentanyl/midazolam for hypotension to the 80s. Received 2L of NS. On transfer, patient VS were 102, 87/33, 100% on 60% 450 x 18 PEEP 5. Patient has peripheral access x2. . In the ICU, patient appeared comfortable.  Review of sytems: limited due to patient sedation"
    this.showToogle = false
    this.sampleImages = [
      { image: 'image1.png', text: "History of Present Illness:   87 yo F with h/o CHF, COPD on 5 L oxygen at baseline, tracheobronchomalacia s/p stent, presents with acute dyspnea over several days, and lethargy. This morning patient developed an acute worsening in dyspnea, and called EMS. EMS found patient tachypnic at saturating 90% on 5L. Patient was noted to be tripoding. She was given a nebulizer and brought to the ER. . According the patient's husband, she was experiencing symptoms consistent with prior COPD flares. Apparently patient was without cough, chest pain, fevers, chills, orthopnea, PND, dysuria, diarrhea, confusion and neck pain. Her husband is a physician and gave her a dose of levaquin this morning. . In the ED, patient was saturating 96% on NRB. CXR did not reveal any consolidation. Per report EKG was unremarkable. Laboratory evaluation revealed a leukocytosis if 14 and lactate of 2.2. Patient received combivent nebs, solumedrol 125 mg IV x1, aspirin 325 mg po x1. Mg sulfate 2 g IV x1, azithromycin 400 mg IVx1, levofloxacin 750 mg IVx1, and Cefrtiaxone 1g IVx1. Patient became tachpnic so was trialed on non-invasive ventilation but became hypotensive to systolics of 80, so noninvasive was removed and patient did well on NRB and nebulizers for about 2 hours. At that time patient became agitated, hypoxic to 87% and tachypnic to the 40s, so patient was intubated. Post intubation ABG was 7.3/60/88/31. Propafol was switched to fentanyl/midazolam for hypotension to the 80s. Received 2L of NS. On transfer, patient VS were 102, 87/33, 100% on 60% 450 x 18 PEEP 5. Patient has peripheral access x2. . In the ICU, patient appeared comfortable.  Review of sytems: limited due to patient sedation" },
      { image: 'image2.png', text: "History of Present Illness: This 81 year old woman has a history of COPD. Over the past five  years she has had progressive difficulties with her breathing. In [**2118-6-4**] she was admitted to [**Hospital1 18**] for respiratory failure due to a COPD exacerbation. Due to persistent hypoxemia, she required intubation and a eventual bronchoscopy on [**2118-6-9**] revealed marked  narrowing of the airways on expiration consistent with tracheomalacia. She subsequently underwent placement of two silicone stents, one in the left main stem and one in the trachea. During the admission the patient had complaints of chest pain and ruled out for an MI. She was subsequently discharged to  [**Hospital1 **] for physical and pulmonary rehab. Repeat bronchoscopy on [**2118-8-1**] revealed granulation tissue at the distal right lateral wall of the tracheal stent. There was significant malacia of the  peripheral and central airways with complete collapse of the airways on coughing and forced expiration. Small nodules were also noted on the vocal cords. She has noticed improvement in her respiratory status, but most recently has been in discussion with Dr. [**First Name4 (NamePattern1) 951**] [**Last Name (NamePattern1) 952**] regarding possible tracheobronchial plasty  with mesh. Tracheal stents d/c [**2119-4-19**] in anticipation of surgery. In terms of symptoms, she describes many years of intermittent chest pain that she describes as left sided and occurring at any  time. Currently, she notices it about three times a week, and states that it seems to resolve after three nitroglycerin. She currently is dependent on oxygen and wears 1.5-2 liters around the clock. She has frequent coughing and brings up 'dark sputum'." },
      { image: 'image3.png', text: "HISTORY OF PRESENT ILLNESS: This is an 81-year-old female with a history of emphysema (not on home O2), who presents with three days of shortness of breath thought by her primary care doctor to be a COPD flare.  Two days prior to admission, she was started on a prednisone taper and one day prior to admission she required oxygen at home in order to maintain oxygen saturation greater than 90%.  She has also been on levofloxacin and nebulizers, and was not getting better, and presented to the [**Hospital1 18**] Emergency Room.  In the [**Hospital3 **] Emergency Room, her oxygen saturation was 100% on CPAP.  She was not able to be weaned off of this despite nebulizer treatment and Solu-Medrol 125 mg IV x2.  Review of systems is negative for the following:  Fevers, chills, nausea, vomiting, night sweats, change in weight, gastrointestinal complaints, neurologic changes, rashes, palpitations, orthopnea.  Is positive for the following: Chest pressure occasionally with shortness of breath with exertion, some shortness of breath that is positionally related, but is improved with nebulizer treatment." },
      { image: 'image4.jpg', text: "History of Present Illness:   [**Known firstname **] [**Known lastname 1852**] is a 62-year-old left-handed man who is here for a follow up of his left sphenoid meningioma.  I last saw him on [**2149-11-17**] and his head CT showed growth of the left sphenoid meningioma.  He is seizure free.  Today, he is here with his wife and daughter.  [**Name (NI) **] does not have headache, nausea, vomiting, urinary incontinence, or fall.  His neurological problem began on [**2142-6-22**] when he became confused and disoriented in a hotel bathroom.  At that time, he was visiting his daughter for a wedding.  His wife found him slumped over in the bath tube.  According to her, his eyes looked funny.  He could not stand up.  His verbal output did not make sense.  He was brought to [**Doctor First Name 1853**] Hospital in Placentia, CA.  He woke up 7 to 8 hours later in the emergency room.  He felt very tired after the event.  He was hospitalized from [**2142-6-22**] to [**2142-6-25**].  He had a cardiac pacemaker placement due to irregular heart rate and bradycardia.  He also had a head MRI that showed a less than 1 cm diameter sphenoid meningioma.  Past Medical History: Cardiac arrhythmia as noted above, has a pacemaker in place, prostate cancer with prostatectomy, and hypertension. " }
    ]
  }
  sampleClicked(item, index) {
    this.index = index
    this.textArea = item.text
    this.Anatomy = []
    this.Diseases = []
    this.Dosage = []
    this.Drugs = []
    this.Negative_drugs_diseases = []
    this.submitData = false
    this.checkAnatomy = true
    this.checkDiseases = true
    this.checkDrugs = true
    this.checkNegative_drugs_diseases = true
    this.checkDosage = true
  }
  movetotarget(el: HTMLElement) {
    el.scrollIntoView({ behavior: "smooth" });
  }
  closeError() {
    this.error = false
  }
  resetText() {
    this.ngOnInit()
  }
  switchAnatomy(value) {
    this.checkAnatomy = value
    var textArea = this.textArea
    let item
    if (!value) {
      for (item of this.Anatomy) {
        textArea = textArea.replace(`<span class="text-danger">${item["term"]} </span>`, item["term"]);
      }
    } else {
      for (item of this.Anatomy) {
        textArea = textArea.replace(item["term"], `<span class="text-danger">${item["term"]} </span>`);
      }
    }

    console.log(textArea)
    this.textArea = textArea
  }
  switchDiseases(value) {
    this.checkDiseases = value
    var textArea = this.textArea
    let item
    if (!value) {
      for (item of this.Diseases) {
        textArea = textArea.replace(`<span class="text-warning">${item["term"]} </span>`, item["term"]);
      }
    } else {
      for (item of this.Diseases) {
        textArea = textArea.replace(item["term"], `<span class="text-warning">${item["term"]} </span>`);
      }
    }
    console.log(textArea)
    this.textArea = textArea
  }
  switchDrugs(value) {
    this.checkDrugs = value
    var textArea = this.textArea
    let item
    if (!value) {
      for (item of this.Drugs) {
        textArea = textArea.replace(`<span class="text-primary">${item["term"]} </span>`, item["term"]);
      }
    } else {
      for (item of this.Drugs) {
        textArea = textArea.replace(item["term"], `<span class="text-primary">${item["term"]} </span>`);
      }
    }
    console.log(textArea)
    this.textArea = textArea
  }
  switchDosage(value) {
    this.checkDosage = value
    var textArea = this.textArea
    let item
    if (!value) {
      for (item of this.Dosage) {
        textArea = textArea.replace(`<span class="text-success">${item["term"]} </span>`, item["term"]);
      }
    } else {
      for (item of this.Dosage) {
        textArea = textArea.replace(item["term"], `<span class="text-success">${item["term"]} </span>`);
      }
    }
    console.log(textArea)
    this.textArea = textArea
  }
  submitText(el: HTMLElement) {
    this.loader = true
    this.showToogle = true
    var responseData = this.textArea
    let item;
    this.Anatomy = this.result[this.index]["Anatomy"]
    this.Drugs = this.result[this.index]["Drugs"]
    this.Diseases = this.result[this.index]["Diseases"]
    this.Negative_drugs_diseases = this.result[this.index]["Negative_drugs_diseases"]
    this.Dosage = this.result[this.index]["Dosage"]
    console.log(this.Anatomy)
    for (item of this.Anatomy) {
      responseData = responseData.replace(item["term"], `<span class="text-danger">${item["term"]} </span>`);
    }
    for (item of this.Drugs) {
      responseData = responseData.replace(item["term"], `<span class="text-primary">${item["term"]} </span>`);
    }
    for (item of this.Diseases) {
      responseData = responseData.replace(item["term"], `<span class="text-warning">${item["term"]} </span>`);
    }
    for (item of this.Dosage) {
      responseData = responseData.replace(item["term"], `<span class="text-success">${item["term"]} </span>`);
    }
    console.log(responseData)
    setTimeout(() => {
      this.submitData = true
      this.textArea = responseData
      this.loader = false;
      el.scrollIntoView({ behavior: "smooth" });
    }, 1200);

        
  }

}

