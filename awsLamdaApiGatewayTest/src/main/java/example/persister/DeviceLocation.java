package example.persister;

public class DeviceLocation {

	private String deviceId ;
	private double lat ;
	private double lng ; 
	
	public DeviceLocation() {
		
	}

	public String getDeviceId() {
		return deviceId;
	}

	public void setDeviceId(String deviceId) {
		this.deviceId = deviceId;
	}

	public double getLat() {
		return lat;
	}

	public void setLat(double lat) {
		this.lat = lat;
	}

	public double getLng() {
		return lng;
	}

	public void setLng(double lng) {
		this.lng = lng;
	}
	
	@Override
    public String toString() {
        final StringBuilder sb = new StringBuilder("DeviceLocation{");
        sb.append("lat=").append(lat);
        sb.append(", lng=").append(lng);
        sb.append(", deviceId='").append(deviceId).append('\'');
        sb.append('}');
        return sb.toString();
    }

}
