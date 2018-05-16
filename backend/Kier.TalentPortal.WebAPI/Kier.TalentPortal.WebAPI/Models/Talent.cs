﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.SharePoint.Client;

namespace Kier.TalentPortal.WebAPI.Models
{
    public class Talent
    {
        public int Id { get; set; }
        public string EmployeeId { get; set; }
        public string Name { get; set; }
        public string Manager { get; set; }
        public string AreaHead { get; set; }
        public string Function { get; set; }
        public string Division { get; set; }
        public string Unit { get; set; }
        public string Stream { get; set; }
        public string Location { get; set; }
        public string BusinessRisk { get; set; }
        public string FlightRisk { get; set; }
        public string Performance { get; set; }
        public string Potential { get; set; }
        public string Grade { get; set; }
        public string Movement { get; set; }
        public string Requirements_01_category { get; set; }
        public string Requirements_01_subcategory { get; set; }
        public string Requirements_02_category { get; set; }
        public string Requirements_02_subcategory { get; set; }
        public string Notes { get; set; }
        public int SubmissionYear { get; set; }
        public bool IsCurrent { get; set; }
        public Talent PreviousYear { get; set; }

        public static Talent FromSPListItem(ListItem item)
        {
            var talent = new Talent();
             talent.Division = item[Constants.Talent_Record_Division].ToString() ;
            talent.Stream = item[Constants.Talent_Record_Business_Stream].ToString() ;
            talent.Unit = item[Constants.Talent_Record_Business_Unit].ToString() ;
            talent.AreaHead = item[Constants.Talent_Record_Area_Head].ToString();
            talent.BusinessRisk = item[Constants.Talent_Record_Business_Risk].ToString();
            talent.Notes = item[Constants.Talent_Record_Development_Notes] as string;
            talent.EmployeeId = item[Constants.Talent_Record_Employee_Id] as string;
            talent.FlightRisk = item[Constants.Talent_Record_Flight_Risk] as string;
            talent.Function = item[Constants.Talent_Record_Function] as string;
            talent.Grade = item[Constants.Talent_Record_Grade] as string;
            talent.Location = item[Constants.Talent_Record_Location] as string;
            talent.Movement = item[Constants.Talent_Record_Movement] as string;
            talent.Performance = item[Constants.Talent_Record_Performance] as string;
            talent.Potential = item[Constants.Talent_Record_Potential] as string;
            talent.IsCurrent = (item[Constants.Talent_Record_Is_Current_Submission] != null)
                ? bool.Parse(item[Constants.Talent_Record_Is_Current_Submission].ToString())
                : false;
            talent.SubmissionYear = (item[Constants.Talent_Record_Submission_Year] != null)
                ? int.Parse(item[Constants.Talent_Record_Submission_Year].ToString())
                : -1;
            talent.Id = (item["ID"]!=null)? int.Parse(item["ID"].ToString()):-1;
            return talent;
        }

        public static ListItem ToSPListItem(Talent talent, ListItem listItem)
        {
  
            listItem[Constants.Talent_Record_Division] = talent.Division;
            listItem[Constants.Talent_Record_Business_Stream] = talent.Stream;
            listItem[Constants.Talent_Record_Business_Unit] = talent.Unit;
            listItem[Constants.Talent_Record_Area_Head] = talent.AreaHead;
            listItem[Constants.Talent_Record_Business_Risk] = talent.BusinessRisk;
            listItem[Constants.Talent_Record_Development_Notes] = talent.Notes;
            listItem[Constants.Talent_Record_Employee_Id] = talent.EmployeeId;
            listItem[Constants.Talent_Record_Flight_Risk] = talent.FlightRisk;
            listItem[Constants.Talent_Record_Function] = talent.Function;
            listItem[Constants.Talent_Record_Grade] = talent.Grade;
            listItem[Constants.Talent_Record_Location] = talent.Location;
            listItem[Constants.Talent_Record_Movement] = talent.Movement;
            listItem[Constants.Talent_Record_Performance] = talent.Performance;
            listItem[Constants.Talent_Record_Potential] = talent.Potential;
            listItem[Constants.Talent_Record_Submission_Year] = talent.SubmissionYear;
            //listItem["ID"] = talent.Id;
            return listItem;
        }
    }
}