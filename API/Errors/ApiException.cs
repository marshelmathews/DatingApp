using System;

namespace API.Errors;

public class ApiException(int statuscode,string message,string? detials)
{
    public int StatusCode { get; set; } = statuscode;
    public string Message { get; set; } = message;
    public string? Detials { get; set; } = detials;

}
